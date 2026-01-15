import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.email}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
