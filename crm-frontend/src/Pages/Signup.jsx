import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5010/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          role: 'User'
        })
      });

      if (response.ok) {
        setSuccess('Account created successfully. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        const data = await response.json();
        setError(data.message || 'Unable to create account');
      }
    } catch (err) {
      setError('Unable to connect to server');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handleSignup} style={{ width: '320px', padding: '24px', border: '1px solid #d1d5db', borderRadius: '10px', backgroundColor: 'white' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
        {error && <p style={{ color: '#dc2626', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: '#059669', textAlign: 'center' }}>{success}</p>}

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input name="name" value={formData.name} onChange={onChange} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
          <input name="phone" value={formData.phone} onChange={onChange} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={onChange} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Sign Up
        </button>

        <p style={{ textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
