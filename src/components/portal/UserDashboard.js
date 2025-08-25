import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

// Import your existing components
import Header from '../Header';
import Navigation from '../Navigation';
import StatCards from '../StatCards';
import Overview from '../Overview';
import LeetCodeJourney from '../LeetCodeJourney';
import WeeklyProgress from '../WeeklyProgress';
import Projects from '../Projects';

// New portal-specific components
import UserProfile from './UserProfile';

// Import DarkModeToggle
import DarkModeToggle from '../DarkModeToggle';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { stats, loading } = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState('overview');
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };

  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <h2>Loading your progress...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {/* Portal Header with User Info */}
      <div className="portal-header">
        <div className="portal-nav">
          <div className="portal-logo">
            <h1>🚀 AI NAECO BLUE</h1>
            <span className="portal-subtitle">Internship Portal</span>
          </div>
          
          <div className="user-controls">
            <button 
              className="user-profile-btn"
              onClick={() => setShowUserProfile(true)}
            >
              <span className="user-avatar">{currentUser?.avatar}</span>
              <span className="user-info">
                <span className="user-name">{currentUser?.fullName}</span>
              </span>
            </button>
            
            <button 
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>
        </div>


      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Your existing components with user-specific data */}
        <div className="dashboard-main">
          <Header />
          <StatCards />
          <Navigation activeSection={activeSection} showSection={showSection} />
          
          <div className="content-sections">
            <Overview isActive={activeSection === 'overview'} />
            <LeetCodeJourney isActive={activeSection === 'leetcode'} />
            <WeeklyProgress isActive={activeSection === 'weekly'} />
            <Projects isActive={activeSection === 'projects'} />
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfile 
          isOpen={showUserProfile}
          onClose={() => setShowUserProfile(false)}
        />
      )}

      {/* Dark Mode Toggle Button - ADD THIS */}
      <DarkModeToggle />

      {/* Portal Footer */}
      <div className="portal-footer">
        <p>AI NAECO BLUE Internship Portal - Track your progress, achieve your goals! 🎯</p>
        <div className="footer-stats">
          <span>📊 {stats.problemsSolved} Problems Solved</span>
          <span>🚀 {stats.projectsCompleted} Projects Completed</span>
          <span>📅 {stats.weeksCompleted} Weeks Completed</span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;