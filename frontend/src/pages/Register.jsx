import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'worker', // default worker
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }}>
          <option value="worker">Worker (Hunar-mand / Labour)</option>
          <option value="customer">Customer (Kaam karwane wala)</option>
        </select>

        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="phone" placeholder="Phone Number (e.g. 0300...)" required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#0284c7', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register Now
        </button>
      </form>
    </div>
  );
}