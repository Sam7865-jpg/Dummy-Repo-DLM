import { useState, useEffect } from 'react';
import API from '../api';

export default function SkillProfiler() {
  const [experienceText, setExperienceText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [message, setMessage] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false); // Detail modal open/close state
  const [userData, setUserData] = useState({});

  // Pehle se save ki hui skills load karna
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/worker/skills');
        if (data) {
          setExperienceText(data.experienceText || '');
          setExtractedSkills(data.extractedSkills || []);
        }
        // Local user info fetch karna
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUserData(localUser);
      } catch (err) {
        console.log('Error fetching skills');
      }
    };
    fetchSkills();
  }, []);

  const handleAIExtract = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/worker/extract-skills', { experienceText });
      setMessage(data.message);
      
      const skills = data.skillProfile ? data.skillProfile.extractedSkills : data.extractedSkills;
      setExtractedSkills(skills || []);
    } catch (err) {
      setMessage('AI extraction mein error aa gaya');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '8px' }}>Module 2: AI Experience & Skill Profiler 🤖</h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Apna tajurba ya kaam ki tafseel yahan likhein, AI aapka data analyze karke ek professional structured profile taiyar karega:
      </p>
      
      {message && <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '15px' }}>{message}</p>}

      <form onSubmit={handleAIExtract} style={{ marginBottom: '30px' }}>
        <textarea 
          rows="4" 
          placeholder="Misal: Main 5 saal se wiring, circuit breaker fixing aur ac repair ka kaam kar raha hoon..." 
          value={experienceText} 
          onChange={(e) => setExperienceText(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none' }}
        />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
          Generate & Save Structured Profile 🚀
        </button>
      </form>

      {/* --- CLICKABLE STRUCTURED PROFILE CARD --- */}
      {extractedSkills.length > 0 && (
        <div 
          onClick={() => setShowDetailModal(true)}
          title="Click to view full detailed profile"
          style={{ 
            border: '2px solid #3b82f6', 
            borderRadius: '10px', 
            padding: '25px', 
            background: '#f8fafc', 
            marginTop: '20px', 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '55px', height: '55px', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold' }}>
                👤
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{userData.name || 'Worker Profile'}</h3>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  Verified Professional • Click for Details 🔍
                </span>
              </div>
            </div>
            <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>View Detail &rarr;</span>
          </div>

          <div style={{ marginTop: '15px', color: '#475569', fontSize: '14px' }}>
            <strong>Skills Preview:</strong> {extractedSkills.map(s => s.skillName).join(', ')}
          </div>
        </div>
      )}

      {/* --- DETAILED PROFILE MODAL (POPUP) --- */}
      {showDetailModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '600px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative', animation: 'fadeIn 0.3s'
          }}>
            
            {/* Close Button */}
            <button 
              onClick={() => setShowDetailModal(false)}
              style={{
                position: 'absolute', top: '15px', right: '15px', background: '#ef4444', color: 'white',
                border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
              <div style={{ width: '65px', height: '65px', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 'bold' }}>
                👤
              </div>
              <div>
                <h2 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{userData.name || 'Worker Name'}</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Email: {userData.email || 'N/A'}</p>
                <span style={{ display: 'inline-block', marginTop: '5px', background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  Role: {userData.role || 'Worker'} (Verified)
                </span>
              </div>
            </div>

            {/* Full Bio Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#334155', marginBottom: '8px', fontSize: '15px' }}>📄 Complete Professional Bio:</h4>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '14px', lineHeight: '1.5' }}>
                {experienceText || 'No bio provided yet.'}
              </div>
            </div>

            {/* Detailed Skills & Proficiency Badges */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#334155', marginBottom: '10px', fontSize: '15px' }}>⚡ Extracted Skills & Proficiency Levels:</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {extractedSkills.map((s, index) => (
                  <div key={index} style={{ background: '#e0e7ff', color: '#3730a3', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: '1px solid #c7d2fe' }}>
                    🛠️ {s.skillName} <span style={{ fontSize: '11px', color: '#312e81', background: '#c7d2fe', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>{s.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Modal Button */}
            <button 
              onClick={() => setShowDetailModal(false)}
              style={{
                width: '100%', padding: '12px', background: '#0f172a', color: 'white',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '10px'
              }}
            >
              Close Detailed Profile
            </button>

          </div>
        </div>
      )}
    </div>
  );
}