import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'worker',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      if (data.role === 'worker') {
        navigate('/worker-profile');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Create an Account</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Join the Digital Labour Marketplace</p>
        </div>

        {error && (
          <div style={{ background: '#ffeeef', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>I want to join as</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                fontSize: '14px', 
                fontWeight: '600',
                outline: 'none', 
                background: '#ffffff', 
                color: '#0f172a', 
                boxSizing: 'border-box',
                cursor: 'pointer' 
              }}
            >
              <option value="worker" style={{ color: '#0f172a', background: '#ffffff', fontWeight: '600' }}>Worker (Hunar-mand / Labour)</option>
              <option value="customer" style={{ color: '#0f172a', background: '#ffffff', fontWeight: '600' }}>Customer (Kaam karwane wala)</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Usama Asif" 
              required 
              value={formData.name}
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                fontSize: '14px', 
                fontWeight: '600',
                outline: 'none', 
                background: '#ffffff', 
                color: '#0f172a', 
                boxSizing: 'border-box' 
              }} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com" 
              required 
              value={formData.email}
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                fontSize: '14px', 
                fontWeight: '600',
                outline: 'none', 
                background: '#ffffff', 
                color: '#0f172a', 
                boxSizing: 'border-box' 
              }} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              value={formData.password}
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                fontSize: '14px', 
                fontWeight: '600',
                outline: 'none', 
                background: '#ffffff', 
                color: '#0f172a', 
                boxSizing: 'border-box' 
              }} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              placeholder="03001234567" 
              required 
              value={formData.phone}
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                fontSize: '14px', 
                fontWeight: '600',
                outline: 'none', 
                background: '#ffffff', 
                color: '#0f172a', 
                boxSizing: 'border-box' 
              }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}