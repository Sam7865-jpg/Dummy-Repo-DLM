import { useState, useEffect } from 'react';
import API from '../api';
import SkillProfiler from '../components/SkillProfiler'; // AI Skill Profiler component import

export default function WorkerProfilePage() {
  const [profile, setProfile] = useState({
    title: '',
    hourlyRate: '',
    skills: '',
    experienceYears: '',
    location: ''
  });
  const [message, setMessage] = useState('');
  const [showAIPopup, setShowAIPopup] = useState(false); // Save ke baad AI Profiler popup kholne ke liye state

  // Pehle se bani hui profile fetch karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/worker/profile');
        if (data) {
          setProfile(data);
        }
      } catch (err) {
        console.log('Profile not found yet, create a new one.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Jab worker Save ka green button dabaye ga
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await API.post('/worker/profile', profile);
      setMessage('Profile successfully save ho gayi hai!');
      
      // Magic step: Save hote hi foran AI Skill Profiler ka popup auto-trigger ho jaye ga!
      setShowAIPopup(true);
    } catch (err) {
      setMessage('Profile save karne mein error aa gaya.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '8px', fontSize: '24px', fontWeight: 'bold' }}>My Worker Profile</h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '25px' }}>
        Apni professional details darj karein aur Save dabane ke baad AI Profiler ke zariye apni skills analyze karwayein.
      </p>

      {message && <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '15px' }}>{message}</p>}

      <form onSubmit={handleSaveProfile}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Professional Title (e.g. Electrician / Plumber)</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Misal: Senior Electrician" 
            value={profile.title} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Hourly Rate ($ / PKR)</label>
          <input 
            type="number" 
            name="hourlyRate" 
            placeholder="500" 
            value={profile.hourlyRate} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Years of Experience</label>
          <input 
            type="text" 
            name="experienceYears" 
            placeholder="e.g. 5 Years" 
            value={profile.experienceYears} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Location / Area</label>
          <input 
            type="text" 
            name="location" 
            placeholder="Islamabad / Rawalpindi" 
            value={profile.location} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        {/* Green Save Button */}
        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
        >
          Save Profile & Launch AI Profiler 🚀
        </button>
      </form>

      {/* --- AUTOMATIC AI SKILL PROFILER POPUP (MODAL) --- */}
      {showAIPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '650px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
          }}>
            
            {/* Close Popup Button */}
            <button 
              onClick={() => setShowAIPopup(false)}
              style={{
                position: 'absolute', top: '15px', right: '15px', background: '#ef4444', color: 'white',
                border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px'
              }}
            >
              ✕
            </button>

            {/* Popup Heading */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '20px' }}>✨ AI Experience & Skill Profiler</h3>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Profile save ho chuki hai! Ab apna tajurba darj karein taake AI aapki skills extract kar sake.</p>
            </div>

            {/* Render SkillProfiler Component inside the popup */}
            <SkillProfiler />

            {/* Finish / Close Button at bottom */}
            <button 
              onClick={() => setShowAIPopup(false)}
              style={{
                width: '100%', marginTop: '20px', padding: '10px', background: '#0f172a', color: 'white',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
              }}
            >
              Done / Close Window
            </button>

          </div>
        </div>
      )}
    </div>
  );
}