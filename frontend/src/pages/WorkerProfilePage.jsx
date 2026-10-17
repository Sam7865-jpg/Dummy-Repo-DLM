import { useState } from 'react';
import API from '../api';
import SkillProfiler from '../components/SkillProfiler';

export default function WorkerProfilePage() {
  const [formData, setFormData] = useState({
    title: '',
    hourlyRate: '',
    experience: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showProfiler, setShowProfiler] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await API.post('/workers/profile', formData);
      setSuccess(true);
      setShowProfiler(true); // Profile save hone par AI Skill Profiler popup trigger ho jaye ga
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Profile save karne mein error aa gaya.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>My Worker Profile</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Apni professional details darj karein aur Save dabane ke baad AI Profiler ke zariye apni skills analyze karwayein.
          </p>
        </div>

        {error && (
          <div style={{ background: '#ffeeef', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && !showProfiler && (
          <div style={{ background: '#ecfdf5', border: '1px solid #34d399', color: '#065f46', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            Profile successfully save ho gayi hai! AI Profiler khul raha hai...
          </div>
        )}

        <form onSubmit={handleSaveProfile}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Professional Title (e.g. Electrician / Plumber)
            </label>
            <input 
              type="text" 
              name="title" 
              required 
              value={formData.title} 
              onChange={handleChange}
              placeholder="Electrician"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Hourly Rate ($ / PKR)
            </label>
            <input 
              type="number" 
              name="hourlyRate" 
              required 
              value={formData.hourlyRate} 
              onChange={handleChange}
              placeholder="1300"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Years of Experience
            </label>
            <input 
              type="number" 
              name="experience" 
              required 
              value={formData.experience} 
              onChange={handleChange}
              placeholder="5"
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Location / Area
            </label>
            <input 
              type="text" 
              name="location" 
              required 
              value={formData.location} 
              onChange={handleChange}
              placeholder="F-6, Islamabad"
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
            {loading ? 'Saving Profile...' : 'Save Profile & Launch AI Profiler'}
          </button>
        </form>
      </div>

      {/* AI Skill Profiler Modal Popup */}
      {showProfiler && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '650px', borderRadius: '12px', padding: '25px', position: 'relative', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setShowProfiler(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
            >
              ✕
            </button>
            <SkillProfiler />
          </div>
        </div>
      )}
    </div>
  );
}