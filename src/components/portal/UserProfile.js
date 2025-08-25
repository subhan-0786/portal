import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../store/slices/authSlice';

const UserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    avatar: currentUser?.avatar || '👨‍💻'
  });

  const avatarOptions = [
    '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼',
    '🧑‍💻', '🧑‍🎓', '🧑‍💼', '👤', '😊', '🤓'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Update user profile
    dispatch(updateCurrentUser(formData));
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully! ✅');
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      avatar: currentUser?.avatar || '👨‍💻'
    });
    setIsEditing(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'viewStats':
        alert('📊 Full statistics view coming soon!');
        break;
      case 'exportProgress':
        alert('📥 Export feature coming soon!');
        break;
      case 'setGoals':
        alert('🎯 Goal setting feature coming soon!');
        break;
      case 'addNote':
        alert('📝 Note taking feature coming soon!');
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-profile-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 User Profile</h2>
          <button className="close-button" onClick={onClose}>✖️</button>
        </div>

        <div className="modal-body">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-avatar-section">
              {isEditing ? (
                <div className="avatar-edit">
                  <h4>Choose Avatar:</h4>
                  <div className="avatar-options">
                    {avatarOptions.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`avatar-option ${formData.avatar === avatar ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="profile-avatar-display">
                  <div className="large-avatar">{currentUser?.avatar}</div>
                </div>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <div className="input-group">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <strong>Full Name:</strong>
                    <span>{currentUser?.fullName || 'Not provided'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>Username:</strong>
                    <span>{currentUser?.username || 'N/A'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <span>{currentUser?.email || 'Not provided'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>Role:</strong>
                    <span>{currentUser?.role || 'Intern'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>Join Date:</strong>
                    <span>{currentUser?.joinDate || 'N/A'}</span>
                  </div>

                  {currentUser?.department && (
                    <div className="detail-item">
                      <strong>Department:</strong>
                      <span>{currentUser.department}</span>
                    </div>
                  )}

                  {currentUser?.mentor && (
                    <div className="detail-item">
                      <strong>Mentor:</strong>
                      <span>{currentUser.mentor}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Statistics */}
          <div className="profile-stats">
            <h3>📊 Your Progress Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <span className="stat-number">{stats?.daysOfLeetCode || 0}</span>
                  <span className="stat-label">Days of LeetCode</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">💻</div>
                <div className="stat-info">
                  <span className="stat-number">{stats?.problemsSolved || 0}</span>
                  <span className="stat-label">Problems Solved</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <span className="stat-number">{stats?.weeksCompleted || 0}</span>
                  <span className="stat-label">Weeks Completed</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">🚀</div>
                <div className="stat-info">
                  <span className="stat-number">{stats?.projectsCompleted || 0}</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="profile-achievements">
            <h3>🏆 Achievements</h3>
            <div className="achievements-grid">
              <div className={`achievement-badge ${(stats?.problemsSolved || 0) >= 10 ? 'earned' : 'locked'}`}>
                <div className="badge-icon">🔥</div>
                <div className="badge-info">
                  <span className="badge-name">Problem Solver</span>
                  <span className="badge-desc">Solve 10+ LeetCode problems</span>
                  <span className="badge-progress">({stats?.problemsSolved || 0}/10)</span>
                </div>
              </div>
              
              <div className={`achievement-badge ${(stats?.projectsCompleted || 0) >= 3 ? 'earned' : 'locked'}`}>
                <div className="badge-icon">⭐</div>
                <div className="badge-info">
                  <span className="badge-name">Project Master</span>
                  <span className="badge-desc">Complete 3+ projects</span>
                  <span className="badge-progress">({stats?.projectsCompleted || 0}/3)</span>
                </div>
              </div>
              
              <div className={`achievement-badge ${(stats?.weeksCompleted || 0) >= 2 ? 'earned' : 'locked'}`}>
                <div className="badge-icon">📚</div>
                <div className="badge-info">
                  <span className="badge-name">Consistent Learner</span>
                  <span className="badge-desc">Complete 2+ weeks of learning</span>
                  <span className="badge-progress">({stats?.weeksCompleted || 0}/2)</span>
                </div>
              </div>
              
              <div className={`achievement-badge ${(stats?.daysOfLeetCode || 0) >= 7 ? 'earned' : 'locked'}`}>
                <div className="badge-icon">🎯</div>
                <div className="badge-info">
                  <span className="badge-name">Week Warrior</span>
                  <span className="badge-desc">Practice for 7+ days</span>
                  <span className="badge-progress">({stats?.daysOfLeetCode || 0}/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-actions">
            <h3>⚡ Quick Actions</h3>
            <div className="action-buttons">
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('viewStats')}
              >
                <span className="action-icon">📊</span>
                <span>View Full Stats</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('exportProgress')}
              >
                <span className="action-icon">📥</span>
                <span>Export Progress</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('setGoals')}
              >
                <span className="action-icon">🎯</span>
                <span>Set Goals</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('addNote')}
              >
                <span className="action-icon">📝</span>
                <span>Add Note</span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <div className="edit-buttons">
              <button className="btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                ✅ Save Changes
              </button>
            </div>
          ) : (
            <div className="view-buttons">
              <button className="btn-secondary" onClick={onClose}>
                🚪 Close
              </button>
              <button className="btn-primary" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;