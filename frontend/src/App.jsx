import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import WorkerProfilePage from './pages/WorkerProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '15px 30px', background: '#f8fafc', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>Digital Labour Marketplace</span>

      {!token ? (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
          <Link to="/register" style={{ textDecoration: 'none', color: '#2563eb' }}>Register</Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#2563eb' }}>Login</Link>
        </div>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user.role === 'worker' && (
            <Link to="/worker-profile" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>
              My Worker Profile
            </Link>
          )}
          {user.role === 'customer' && (
            <Link to="/customer-dashboard" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>
              Customer Dashboard
            </Link>
          )}
          <span style={{ color: '#64748b', fontSize: '14px' }}>
            User: <strong>{user.name}</strong> ({user.role})
          </span>
          <button onClick={handleLogout} style={{ padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Worker Only */}
        <Route
          path="/worker-profile"
          element={
            <ProtectedRoute allowedRole="worker">
              <WorkerProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Customer Only */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRole="customer">
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <h2>Customer Dashboard</h2>
                <p>Aap customer account se login hain. Kaam post karne ka option aglay modules mein aayega.</p>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}