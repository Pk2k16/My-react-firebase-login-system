import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
import '../styles/Profile.css';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    const loadProfile = async () => {
      if (user?.uid) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setDisplayName(profile.displayName || '');
          setBio(profile.bio || '');
        }
      }
    };
    loadProfile();
  }, [user?.uid]);

  const handleSave = async () => {
    if (!user?.uid) return;

    setLoading(true);
    setMessage('');

    try {
      await updateUserProfile(user.uid, {
        displayName,
        bio,
        email: user.email,
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p className="email-label">Email: {user?.email}</p>
        </div>

        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>

        {message && (
          <div className={message.includes('success') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <button onClick={handleSave} disabled={loading} className="save-button">
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};
