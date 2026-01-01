#!/usr/bin/env node
// Usage:
// RENDER_API_KEY=... SERVICE_ID=... node scripts/render_set_env_and_deploy.js --db "postgres://..." --jwt "your_jwt_secret"
// Requires Node 18+ (global fetch)

const SERVICE_ID = process.env.SERVICE_ID || process.env.RENDER_SERVICE_ID || process.argv.find(a=>a.startsWith('--service='))?.split('=')[1];
const API_KEY = process.env.RENDER_API_KEY;

if (!API_KEY) {
  console.error('RENDER_API_KEY is required (export RENDER_API_KEY=...)');
  process.exit(1);
}
if (!SERVICE_ID) {
  console.error('SERVICE_ID is required. Pass as SERVICE_ID env var or --service=<id>');
  process.exit(1);
}

const argv = require('minimist')(process.argv.slice(2));
const DATABASE_URL = argv.db || argv.database || process.env.DATABASE_URL;
const JWT_SECRET = argv.jwt || process.env.JWT_SECRET || 'replace_this_with_a_real_secret';
const NODE_ENV = argv.node_env || process.env.NODE_ENV || 'production';
const FRONTEND_URL = argv.frontend || argv.front || process.env.FRONTEND_URL || null;

const API_BASE = 'https://api.render.com/v1';

async function fetchJson(url, opts={}){
  const res = await fetch(url, opts);
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch(e) { body = text; }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${JSON.stringify(body)}`);
  }
  return body;
}

async function listEnvVars(){
  return await fetchJson(`${API_BASE}/services/${SERVICE_ID}/env-vars`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
}

async function createEnvVar(key, value, secure=true){
  return await fetchJson(`${API_BASE}/services/${SERVICE_ID}/env-vars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ key, value, secure })
  });
}

async function updateEnvVar(envVarId, value){
  return await fetchJson(`${API_BASE}/services/${SERVICE_ID}/env-vars/${envVarId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ value })
  });
}

async function ensureEnvVar(key, value, secure=true){
  const list = await listEnvVars();
  const found = list.find(e => e.key === key);
  if (found) {
    console.log(`Updating env var ${key}`);
    return await updateEnvVar(found.id, value);
  } else {
    console.log(`Creating env var ${key}`);
    return await createEnvVar(key, value, secure);
  }
}

async function createDeploy(){
  console.log('Triggering a new deploy...');
  return await fetchJson(`${API_BASE}/services/${SERVICE_ID}/deploys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({})
  });
}

(async ()=>{
  try {
    if (!DATABASE_URL) console.warn('DATABASE_URL not provided; skipping');
    else await ensureEnvVar('DATABASE_URL', DATABASE_URL, true);

    await ensureEnvVar('JWT_SECRET', JWT_SECRET, true);
    await ensureEnvVar('NODE_ENV', NODE_ENV, false);

    if (FRONTEND_URL) {
      await ensureEnvVar('FRONTEND_URL', FRONTEND_URL, false);
    } else {
      console.log('No FRONTEND_URL provided; skipping');
    }

    const deploy = await createDeploy();
    console.log('Deploy triggered:', deploy.id || deploy);
    console.log('You can watch deploy logs in the Render dashboard.');
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
