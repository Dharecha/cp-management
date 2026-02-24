import React from "react";
import { useAuth } from "../AuthContext";

function Header() {
    const { logout } = useAuth();

    return (
        <div style={headerStyle}>

            <h2>CRM Dashboard</h2>



            <div style={rightStyle}>
                <span>
                    <button onClick={() => alert("This is notification bar")}>
                        🔔 Notifications
                    </button>
                </span>

                <span>👤 Admin</span>
                <button onClick={logout} style={logoutStyle}>Logout</button>
            </div>

        </div>
    );
}

const headerStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "60px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000
};

const searchStyle = {
    padding: "8px",
    width: "250px"
};

const rightStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center"
};

const logoutStyle = {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
};

export default Header;