import { useState, useEffect } from 'react';
import API from '../api';

export default function SkillProfiler() {
  const [experienceText, setExperienceText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [message, setMessage] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/worker/skills');
        if (data) {
          setExperienceText(data.experienceText || '');
          setExtractedSkills(data.extractedSkills || []);
        }
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

  // Function to return RELEVANT skill suggestions based on worker's field/experience
  const getRelevantSuggestions = () => {
    const text = (experienceText + " " + extractedSkills.map(s => s.skillName).join(" ")).toLowerCase();
    
    if (text.includes('electric') || text.includes('wiring') || text.includes('current') || text.includes('bijli')) {
      return [
        'Advanced Circuit Troubleshooting', 
        'Solar Panel Installation & Maintenance', 
        'Industrial Electrical Safety Standards', 
        'Smart Home Automation Wiring'
      ];
    } else if (text.includes('plumb') || text.includes('pipe') || text.includes('water') || text.includes('sanitary') || text.includes('nal')) {
      return [
        'Advanced Pipe Fitting & Welding', 
        'Modern Drainage System Design', 
        'Water Filtration & Pump Maintenance', 
        'Advanced Sanitary Installation'
      ];
    } else if (text.includes('mason') || text.includes('brick') || text.includes('mistry') || text.includes('construction') || text.includes('cement')) {
      return [
        'Civil Engineering Fundamentals Course', 
        'Advanced Blueprint & Plan Reading', 
        'Structural Safety Standards & OSHA', 
        'Project Cost Estimation & Budgeting'
      ];
    } else {
      return [
        'Advanced Professional Certification', 
        'Safety Standards & Compliance', 
        'Client Communication & Quality Assurance', 
        'Emergency Quick Response Management'
      ];
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '8px', fontSize: '24px', fontWeight: 'bold' }}>AI Experience & Skill Profiler</h2>
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
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
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
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
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

            {/* --- AI POTENTIAL SKILL SUGGESTIONS SECTION (RELEVANT & DYNAMIC) --- */}
            {extractedSkills.length > 0 && (
              <div style={{ marginBottom: '25px', background: '#fefce8', border: '1px solid #fde047', borderRadius: '10px', padding: '18px' }}>
                <h4 style={{ color: '#854d0e', marginBottom: '6px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  💡 AI Potential Skill Suggestions (Relevant to Your Field)
                </h4>
                <p style={{ fontSize: '13px', color: '#713f12', marginBottom: '12px' }}>
                  Based on your entered experience, these relevant professional courses and certified skills will help you enhance your profile quality:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {getRelevantSuggestions().map((suggestion, idx) => (
                    <span key={idx} style={{ background: '#fef08a', color: '#713f12', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', border: '1px solid #facc15' }}>
                      ✨ {suggestion}
                    </span>
                  ))}
                </div>
              </div>
            )}

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