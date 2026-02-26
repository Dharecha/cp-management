import React, { useEffect, useState } from "react";

function ProductStore() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("http://localhost:5010/api/product", {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Failed to load products (${response.status})`);
                }

                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
                setError("Unable to load products from API.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert("Product out of stock!");
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product_id === product.product_id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product_id !== productId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading Products...</div>;
    if (error) return <div style={{ padding: "40px", textAlign: "center", color: "#dc2626" }}>{error}</div>;

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <div style={productsSection}>
                    <h1 style={{ marginBottom: "30px", color: "#1e293b" }}>Our Products</h1>
                    {products.length === 0 ? (
                        <p style={{ color: "#64748b" }}>No products found in API.</p>
                    ) : (
                        <div style={gridStyle}>
                            {products.map((product) => (
                                <div key={product.product_id} style={productCard}>
                                    <div style={imagePlaceholder}>📦</div>
                                    <h3 style={{ margin: "10px 0" }}>{product.product_name}</h3>
                                    <p style={{ color: "#2563eb", fontWeight: "bold", fontSize: "1.2rem" }}>
                                        ₹{product.price}
                                    </p>
                                    <p style={{ color: product.stock > 0 ? "#059669" : "#dc2626", fontSize: "0.9rem" }}>
                                        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                                    </p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        style={{
                                            ...addBtn,
                                            backgroundColor: product.stock > 0 ? "#2563eb" : "#cbd5e1",
                                            cursor: product.stock > 0 ? "pointer" : "not-allowed",
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={cartSidebar}>
                    <h2 style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "15px" }}>Your Cart</h2>
                    {cart.length === 0 ? (
                        <p style={{ color: "#64748b", marginTop: "20px" }}>Cart is empty</p>
                    ) : (
                        <>
                            <div style={cartList}>
                                {cart.map((item) => (
                                    <div key={item.product_id} style={cartItem}>
                                        <div>
                                            <div style={{ fontWeight: "600" }}>{item.product_name}</div>
                                            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                                                {item.quantity} x ₹{item.price}
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.product_id)} style={removeBtn}>
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div style={cartFooter}>
                                <div style={totalRow}>
                                    <span>Total:</span>
                                    <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                                        ₹{cartTotal.toFixed(2)}
                                    </span>
                                </div>
                                <button style={checkoutBtn}>Checkout</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const pageStyle = { padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "inherit" };
const containerStyle = { display: "flex", gap: "30px", maxWidth: "1200px", margin: "0 auto" };
const productsSection = { flex: 3 };
const cartSidebar = {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    height: "fit-content",
    position: "sticky",
    top: "100px",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
};

const productCard = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    textAlign: "center",
    transition: "transform 0.2s",
    border: "1px solid #e2e8f0",
};

const imagePlaceholder = {
    height: "120px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    marginBottom: "15px",
};

const addBtn = {
    width: "100%",
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "15px",
    fontWeight: "600",
};

const cartList = { marginTop: "20px", maxHeight: "400px", overflowY: "auto" };
const cartItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f1f5f9",
};
const removeBtn = { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" };
const cartFooter = { marginTop: "20px", paddingTop: "15px", borderTop: "2px solid #e2e8f0" };
const totalRow = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" };
const checkoutBtn = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
};

export default ProductStore;
