import React, { useEffect, useState } from "react";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);

    // Load customers
    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        fetch("http://localhost:5010/api/customer")
            .then(res => res.json())
            .then(data => setCustomers(data));
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        } else if (formData.address.trim().length < 5) {
            newErrors.address = "Address must be at least 5 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const addCustomer = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch("http://localhost:5010/api/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                alert("Customer Added Successfully");
                loadCustomers();
                setFormData({ name: "", email: "", phone: "", address: "" });
                setErrors({});
            });
    };

    const editCustomer = (customer) => {
        setEditId(customer.customer_id);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        });
    };

    const updateCustomer = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch(`http://localhost:5010/api/customer/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                alert("Customer Updated");
                loadCustomers();
                setEditId(null);
                setFormData({ name: "", email: "", phone: "", address: "" });
                setErrors({});
            });
    };

    const deleteCustomer = (id) => {
        fetch(`http://localhost:5010/api/customer/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("Customer Deleted");
                loadCustomers();
            });
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>

                {/* LEFT PANEL */}
                <div style={leftPanel}>
                    <h2>General Information</h2>

                    <form onSubmit={editId ? updateCustomer : addCustomer}>
                        <div style={inputGroupStyle}>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{...inputStyle, borderColor: errors.name ? '#dc3545' : '#ccc'}}
                            />
                            {errors.name && <span style={errorStyle}>{errors.name}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                style={{...inputStyle, borderColor: errors.email ? '#dc3545' : '#ccc'}}
                            />
                            {errors.email && <span style={errorStyle}>{errors.email}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <input
                                name="phone"
                                placeholder="Phone Number (10 digits)"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{...inputStyle, borderColor: errors.phone ? '#dc3545' : '#ccc'}}
                            />
                            {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <input
                                name="address"
                                placeholder="Company / Address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{...inputStyle, borderColor: errors.address ? '#dc3545' : '#ccc'}}
                            />
                            {errors.address && <span style={errorStyle}>{errors.address}</span>}
                        </div>

                        <button type="submit" style={btnStyle}>
                            {editId ? "Update Customer" : "Register Customer"}
                        </button>
                    </form>
                </div>

                {/* RIGHT PANEL */}
                <div style={rightPanel}>
                    <h2>Customer List</h2>

                    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                        {customers.map(c => (
                            <div key={c.customer_id} style={customerCard}>
                                <h4>{c.name}</h4>
                                <p>{c.email}</p>
                                <p>{c.phone}</p>
                                <p>{c.address}</p>

                                <div style={{ marginTop: "10px" }}>
                                    <button
                                        style={editBtn}
                                        onClick={() => editCustomer(c)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        style={deleteBtn}
                                        onClick={() => deleteCustomer(c.customer_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ================== STYLES ================== */

const pageStyle = {
    background: "linear-gradient(to right,#8faad1,#6f8fc4)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const cardStyle = {
    width: "1000px",
    display: "flex",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

const leftPanel = {
    flex: 1,
    background: "#ffffff",
    padding: "40px",
    display: "flex",
    flexDirection: "column"
};

const rightPanel = {
    flex: 1,
    background: "linear-gradient(135deg,#5a4bff,#3d2fd1)",
    padding: "40px",
    color: "#ffffff"
};

const inputStyle = {
    padding: "12px",
    marginBottom: "15px",
    border: "none",
    borderBottom: "1px solid #ccc",
    outline: "none",
    width: "100%"
};

const btnStyle = {
    marginTop: "15px",
    padding: "12px",
    background: "#5a4bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%"
};

const customerCard = {
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px"
};

const editBtn = {
    marginRight: "10px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    background: "#ffffff",
    color: "#3d2fd1",
    cursor: "pointer"
};

const deleteBtn = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    background: "#ff4d4d",
    color: "#ffffff",
    cursor: "pointer"
};

const inputGroupStyle = {
    marginBottom: "15px"
};

const errorStyle = {
    color: "#dc3545",
    fontSize: "14px",
    marginTop: "5px",
    display: "block"
};

export default Customers;