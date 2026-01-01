const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://default:PSsowPsNxbSYohVV6tTZCWVa1PhLXwL8@redis-12091.c262.us-east-1-3.ec2.cloud.redislabs.com:12091"
});

redisClient.on("connect", () => {
  console.log("Redis Cloud Connected");
});

redisClient.on("error", (err) => {
  console.error(" Redis Error:", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
