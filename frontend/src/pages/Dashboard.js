import React, { useEffect, useState } from "react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

    fetch(`${API_BASE}/api/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {transactions.length === 0 ? (
        <p>No transactions</p>
      ) : (
        transactions.map(t => (
          <div key={t.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
            <p><b>Amount:</b> {t.amount}</p>
            <p><b>Type:</b> {t.type}</p>
            <p><b>Category:</b> {t.category}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
