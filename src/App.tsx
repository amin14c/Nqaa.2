import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Splash from './pages/auth/Splash';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ClientHome from './pages/client/ClientHome';
import SearchWorkers from './pages/client/SearchWorkers';
import WorkerHome from './pages/worker/WorkerHome';
import Earnings from './pages/worker/Earnings';
import ProfileScreen from './pages/shared/ProfileScreen';

export default function App() {
  const { user, profile, loading } = useAuth();

  if (loading) return <Splash />;

  if (!user || !profile) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (profile.role === 'client') {
    return (
      <Routes>
        <Route path="/" element={<ClientHome />} />
        <Route path="/search" element={<SearchWorkers />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<WorkerHome />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
