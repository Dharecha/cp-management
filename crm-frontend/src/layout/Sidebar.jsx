import { Link } from "react-router-dom";

function Sidebar() {
    return (


        <div style={{
            marginTop: "50px",
            background: "#0c2d48",
            color: "white",
            height: "100vh",
            padding: "20px",
            postion: "fixed",
            top: "100px",
            left: "0",
            width: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            overflow: "auto"



        }}>
            <h2>CRM</h2>

            <div style={{ marginTop: "30px" }}>
                <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
                <p><Link to="/users" style={{ color: "white" }}>Users</Link></p>
                <p><Link to="/customers" style={{ color: "white" }}>Customers</Link></p>
                <p><Link to="/products" style={{ color: "white" }}>Products</Link></p>
            </div>
        </div>

    );
}

export default Sidebar;