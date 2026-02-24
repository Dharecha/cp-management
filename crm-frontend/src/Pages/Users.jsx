import React, { useEffect, useState } from "react";

function UserPage() {

    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await fetch("http://localhost:5010/api/user");
        const data = await res.json();
        setUsers(data);
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

    const addUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Frontend duplicate-email check
        if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
            setErrors({ ...errors, email: "Email already exists" });
            return;
        }

        await fetch("http://localhost:5010/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        alert("User Added");
        loadUsers();
        setFormData({ name: "", email: "", phone: "" });
        setErrors({});
    };

    const editUser = (user) => {
        setEditId(user.user_id);
        setFormData(user);
    };

    const updateUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Frontend duplicate-email check (exclude current user)
        if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.user_id !== editId)) {
            setErrors({ ...errors, email: "Email already exists" });
            return;
        }

        await fetch(`http://localhost:5010/api/user/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        alert("User Updated");
        loadUsers();
        setEditId(null);
        setFormData({ name: "", email: "", phone: "" });
        setErrors({});
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await fetch(`http://localhost:5010/api/user/${id}`, {
            method: "DELETE"
        });

        alert("User Deleted");
        loadUsers();
    };

    return (
        <div style={pageStyle}>

            <h1 style={{ marginBottom: "20px" }}>User Management</h1>

            {/* FORM CARD */}
            <div style={formCard}>
                <form onSubmit={editId ? updateUser : addUser}>

                    <div style={inputGroupStyle}>
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.name ? '#dc3545' : '#ccc' }}
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
                            style={{ ...inputStyle, borderColor: errors.email ? '#dc3545' : '#ccc' }}
                        />
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <input
                            name="phone"
                            placeholder="Phone Number (10 digits)"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.phone ? '#dc3545' : '#ccc' }}
                        />
                        {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                    </div>

                    <button type="submit" style={btnStyle}>
                        {editId ? "Update User" : "Add User"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            style={cancelBtn}
                            onClick={() => {
                                setEditId(null);
                                setFormData({ name: "", email: "", phone: "" });
                                setErrors({});
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* USER TABLE */}
            <div style={tableCard}>
                <h2>User List</h2>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(u => (
                            <tr key={u.user_id}>
                                <td>{u.user_id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>
                                    <button style={editBtn} onClick={() => editUser(u)}>Edit</button>
                                    <button style={deleteBtn} onClick={() => deleteUser(u.user_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

/* STYLES */

const pageStyle = {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh"
};

const formCard = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "25px",
    width: "350px"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px"
};

const btnStyle = {
    width: "100%",
    padding: "12px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

const cancelBtn = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#ccc",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

const tableCard = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
};

const editBtn = {
    marginRight: "10px",
    padding: "6px 12px",
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
};

const deleteBtn = {
    padding: "6px 12px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
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

export default UserPage;