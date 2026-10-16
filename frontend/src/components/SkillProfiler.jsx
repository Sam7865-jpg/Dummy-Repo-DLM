import { useState, useEffect } from 'react';
import API from '../api';

export default function SkillProfiler() {
  const [experienceText, setExperienceText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [message, setMessage] = useState('');

  // Pehle se save ki hui skills load karna
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/worker/skills');
        if (data) {
          setExperienceText(data.experienceText || '');
          setExtractedSkills(data.extractedSkills || []);
        }
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
      setExtractedSkills(data.extractedSkills);
    } catch (err) {
      setMessage('AI extraction mein error aa gaya');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
      <h3>Module 2: AI Experience & Skill Profiler 🤖</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>Apna tajurba ya kaam ki tafseel yahan likhein, AI khud aapke skills extract kar lega[cite: 11]:</p>
      
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}

      <form onSubmit={handleAIExtract}>
        <textarea 
          rows="4" 
          placeholder="Misal: Main 5 saal se wiring, circuit breaker fixing aur ac repair ka kaam kar raha hoon..." 
          value={experienceText} 
          onChange={(e) => setExperienceText(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Extract Skills with AI
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h4>Extracted Skill Tags:</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {extractedSkills.length > 0 ? (
            extractedSkills.map((s, index) => (
              <span key={index} style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 12px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold' }}>
                {s.skillName} ({s.proficiency})
              </span>
            ))
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic' }}>Abhi koi skill extract nahi hui. Text likh kar button dabayein.</p>
          )}
        </div>
      </div>
    </div>
  );
}