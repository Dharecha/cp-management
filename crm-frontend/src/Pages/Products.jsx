import React, { useEffect, useState } from "react";

function Products() {

    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        stock: ""
    });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        fetch("http://localhost:5010/api/product")
            .then(res => res.json())
            .then(data => setProducts(data));
    };

    const validateForm = () => {
        const newErrors = {};

        // Product name validation
        if (!formData.product_name.trim()) {
            newErrors.product_name = "Product name is required";
        } else if (formData.product_name.trim().length < 2) {
            newErrors.product_name = "Product name must be at least 2 characters";
        }

        // Price validation
        const price = parseFloat(formData.price);
        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        } else if (isNaN(price) || price <= 0) {
            newErrors.price = "Please enter a valid positive price";
        }

        // Stock validation
        const stock = parseInt(formData.stock);
        if (!formData.stock.trim()) {
            newErrors.stock = "Stock quantity is required";
        } else if (isNaN(stock) || stock < 0) {
            newErrors.stock = "Please enter a valid non-negative stock quantity";
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

    const addProduct = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch("http://localhost:5010/api/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            })
        })
            .then(res => res.json())
            .then(() => {
                alert("Product Added");
                loadProducts();
                setFormData({ product_name: "", price: "", stock: "" });
                setErrors({});
            });
    };

    const editProduct = (product) => {
        setEditId(product.product_id);
        setFormData(product);
    };

    const updateProduct = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        fetch(`http://localhost:5010/api/product/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            })
        })
            .then(res => res.json())
            .then(() => {
                alert("Product Updated");
                loadProducts();
                setEditId(null);
                setFormData({ product_name: "", price: "", stock: "" });
                setErrors({});
            });
    };

    const deleteProduct = (id) => {
        fetch(`http://localhost:5010/api/product/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("Product Deleted");
                loadProducts();
            });
    };

    return (
        <div style={pageStyle}>

            <h1 style={{ marginBottom: "20px" }}>Product Management</h1>

            {/* FORM CARD */}
            <div style={formCard}>
                <form onSubmit={editId ? updateProduct : addProduct}>

                    <div style={inputGroupStyle}>
                        <input
                            name="product_name"
                            placeholder="Product Name"
                            value={formData.product_name}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.product_name ? '#dc3545' : '#ccc' }}
                        />
                        {errors.product_name && <span style={errorStyle}>{errors.product_name}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="Price (e.g., 99.99)"
                            value={formData.price}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.price ? '#dc3545' : '#ccc' }}
                        />
                        {errors.price && <span style={errorStyle}>{errors.price}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <input
                            name="stock"
                            type="number"
                            placeholder="Stock Quantity"
                            value={formData.stock}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.stock ? '#dc3545' : '#ccc' }}
                        />
                        {errors.stock && <span style={errorStyle}>{errors.stock}</span>}
                    </div>

                    <button type="submit" style={btnStyle}>
                        {editId ? "Update Product" : "Add Product"}
                    </button>

                </form>
            </div>

            {/* PRODUCT TABLE */}
            <div style={tableCard}>
                <h2>Product List</h2>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(p => (
                            <tr key={p.product_id}>
                                <td>{p.product_id}</td>
                                <td>{p.product_name}</td>
                                <td>₹ {p.price}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button style={editBtn} onClick={() => editProduct(p)}>Edit</button>
                                    <button style={deleteBtn} onClick={() => deleteProduct(p.product_id)}>Delete</button>
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

export default Products;