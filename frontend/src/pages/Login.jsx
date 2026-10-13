import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}