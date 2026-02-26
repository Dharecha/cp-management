import React from 'react';
import { Link } from 'react-router-dom';

const Home2 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>

            {/* HEADER */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 40px',
                height: '70px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                    CRM<span style={{ color: '#1f2937' }}>Portal</span>
                </div>
                <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/product-store" style={navLinkStyle}>Products</Link>
                    <Link to="/login" style={{
                        textDecoration: 'none',
                        color: '#2563eb',
                        fontWeight: '600',
                        border: '1px solid #2563eb',
                        padding: '8px 20px',
                        borderRadius: '6px'
                    }}>Login</Link>
                    <Link to="/signup" style={{
                        textDecoration: 'none',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '9px 20px',
                        borderRadius: '6px',
                        fontWeight: '600'
                    }}>Get Started</Link>
                </nav>
            </header>

            {/* HERO SECTION */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3.5rem', color: '#1e293b', marginBottom: '20px', maxWidth: '800px' }}>
                    Manage your business relationships <span style={{ color: '#2563eb' }}>smarter</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>
                    The all-in-one platform to track customers, manage products, and monitor your sales performance with ease.
                </p>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/signup" style={{
                        textDecoration: 'none',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                    }}>
                        Start Free Trial
                    </Link>
                    <Link to="/login" style={{
                        textDecoration: 'none',
                        backgroundColor: '#fff',
                        color: '#1e293b',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        border: '1px solid #cbd5e1'
                    }}>
                        View Demo
                    </Link>
                </div>

                {/* FEATURES PREVIEW */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px',
                    marginTop: '80px',
                    width: '100%',
                    maxWidth: '1100px'
                }}>
                    <FeatureCard
                        title="Customer Tracking"
                        desc="Keep all your client information organized and accessible in one secure database."
                    />
                    <FeatureCard
                        title="Inventory Management"
                        desc="Monitor stock levels and product details in real-time to never miss a sale."
                    />
                    <FeatureCard
                        title="Sales Analytics"
                        desc="Visualize your growth with intuitive dashboards and detailed reporting tools."
                    />
                </div>
            </main>

            {/* FOOTER */}
            <footer style={{ padding: '40px', backgroundColor: '#1e293b', color: '#94a3b8', textAlign: 'center' }}>
                <p>© 2024 CRM Portal. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ title, desc }) => (
    <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'left'
    }}>
        <h3 style={{ color: '#1e293b', marginBottom: '12px' }}>{title}</h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
    </div>
);

const navLinkStyle = {
    textDecoration: 'none',
    color: '#4b5563',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'color 0.2s'
};

export default Home2;