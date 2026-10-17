import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import WorkerProfilePage from './pages/WorkerProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import SkillProfiler from './components/SkillProfiler';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check karein ke kya user login ya register page par hai
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const showLoggedIn = token && !isAuthPage;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '15px 30px', background: '#ffffff', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a', letterSpacing: '-0.3px' }}>
        Digital Labour Marketplace
      </span>

      {!showLoggedIn ? (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
          <Link to="/register" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500', fontSize: '14px' }}>Register</Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500', fontSize: '14px' }}>Login</Link>
        </div>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user.role === 'worker' && (
            <Link to="/worker-profile" style={{ textDecoration: 'none', color: '#334155', fontWeight: '600', fontSize: '14px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px' }}>
              My Worker Profile
            </Link>
          )}
          {user.role === 'customer' && (
            <Link to="/customer-dashboard" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '14px' }}>
              Customer Dashboard
            </Link>
          )}
          
          <div style={{ height: '20px', width: '1px', background: '#cbd5e1' }}></div>

          <span style={{ color: '#475569', fontSize: '14px' }}>
            {user.name} <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'capitalize' }}>({user.role})</span>
          </span>

          <button onClick={handleLogout} style={{ padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/ai-skills"
          element={
            <ProtectedRoute allowedRole="worker">
              <SkillProfiler />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-profile"
          element={
            <ProtectedRoute allowedRole="worker">
              <WorkerProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRole="customer">
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <h2>Customer Dashboard</h2>
                <p>Aap customer account se login hain.</p>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}