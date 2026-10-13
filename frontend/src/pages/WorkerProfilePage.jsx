import { useState, useEffect } from 'react';
import API from '../api';

export default function WorkerProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [profile, setProfile] = useState({
    occupation: '',
    category: 'Home Maintenance',
    experienceYears: '',
    hourlyRate: '',
    city: 'Islamabad',
    address: '',
    bio: '',
  });

  const [message, setMessage] = useState('');

  // Pehle se mojood profile load karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/worker/profile');
        if (data) {
          setProfile(data);
        }
      } catch (err) {
        // Agar pehle se profile na bani ho to koi masla nahi
        console.log('No existing profile found yet');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/worker/profile', profile);
      setMessage(data.message || 'Profile saved successfully!');
    } catch (err) {
      setMessage('Error saving profile');
    }
  };

  return (
    <div style={{ maxWidth: '550px', margin: '40px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Worker Digital Identity & Profile</h2>
      <p><strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email} | <strong>Phone:</strong> {user.phone}</p>
      <hr />

      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Primary Occupation (Pesha):</label>
        <input type="text" name="occupation" placeholder="e.g. Electrician / Plumber" value={profile.occupation} required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

        <label>Service Category:</label>
        <select name="category" value={profile.category} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }}>
          <option value="Home Maintenance">Home Maintenance</option>
          <option value="Construction & Masonry">Construction & Masonry</option>
          <option value="Carpentry & Woodwork">Carpentry & Woodwork</option>
          <option value="Painting & Renovation">Painting & Renovation</option>
          <option value="Cleaning & Sanitation">Cleaning & Sanitation</option>
        </select>

        <label>Experience (in Years):</label>
        <input type="number" name="experienceYears" placeholder="e.g. 5" value={profile.experienceYears} required onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

        <label>Expected Hourly Rate (PKR):</label>
        <input type="number" name="hourlyRate" placeholder="e.g. 1000" value={profile.hourlyRate} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

        <label>City & Address:</label>
        <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="address" placeholder="Area / Address" value={profile.address} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

        <label>Short Bio (Khulasa):</label>
        <textarea name="bio" placeholder="Describe your experience..." value={profile.bio} onChange={handleChange} rows="3" style={{ width: '100%', marginBottom: '15px', padding: '8px' }} />

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save / Update Digital Profile
        </button>
      </form>
    </div>
  );
}