import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0f2fe, #eef2ff)' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: '14px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', padding: '32px', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0, marginBottom: '10px', color: '#1f2937' }}>Welcome to CRM Portal</h1>
        <p style={{ marginBottom: '30px', color: '#4b5563' }}>Manage your customers and products from one place.</p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" style={{ textDecoration: 'none', backgroundColor: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600 }}>
            Login
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', backgroundColor: '#059669', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600 }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
