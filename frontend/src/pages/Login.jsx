import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      if (data.role === 'worker') {
        navigate('/worker-profile');
      } else if (data.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Sign in to access your digital marketplace account</p>
        </div>

        {error && (
          <div style={{ background: '#ffeeef', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}