import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.email}!</h1>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/profile')} className="profile-button">
          View Profile
        </button>
        <button onClick={logout} className="logout-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};
