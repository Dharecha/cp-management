import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        customers: 0,
        products: 0,
        orders: 0
    });

    useEffect(() => {
        axios.get("http://localhost:5010/api/user")
            .then(res => setStats(prev => ({ ...prev, users: res.data.length })));

        axios.get("http://localhost:5010/api/customer")
            .then(res => setStats(prev => ({ ...prev, customers: res.data.length })));

        axios.get("http://localhost:5010/api/product")
            .then(res => setStats(prev => ({ ...prev, products: res.data.length })));

        axios.get("http://localhost:5010/api/order")
            .then(res => setStats(prev => ({ ...prev, orders: res.data.length })));
    }, []);

    return (
        <div style={pageStyle}>
            <h1 style={{ marginBottom: "25px" }}>CRM Dashboard</h1>

            <div style={cardContainer}>
                <Card title="Users" value={stats.users} color="#4CAF50" />
                <Card title="Customers" value={stats.customers} color="#2196F3" />
                <Card title="Products" value={stats.products} color="#FF9800" />
                <Card title="Orders" value={stats.orders} color="#9C27B0" />
            </div>
        </div>
    );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
    return (
        <div style={{ ...cardStyle, borderLeft: `6px solid ${color}` }}>
            <h3>{title}</h3>
            <h1 style={{ color }}>{value}</h1>
            <p>Total {title}</p>
        </div>
    );
}

/* STYLES */

const pageStyle = {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh"
};

const cardContainer = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
};

const cardStyle = {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    width: "230px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s"
};

export default Dashboard;