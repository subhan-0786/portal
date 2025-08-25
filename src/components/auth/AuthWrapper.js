import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserDashboard from '../portal/UserDashboard';
import { loadUsersFromStorage, checkExistingSession } from '../../store/slices/authSlice';
import { loadUserData } from '../../store/slices/userSlice';
import DarkModeToggle from '../DarkModeToggle';

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Load users from storage/JSON first
        await dispatch(loadUsersFromStorage());
        
        // Check for existing session
        const result = await dispatch(checkExistingSession());
        
        // If user is authenticated, load their data
        if (result.payload && result.payload.id) {
          await dispatch(loadUserData(result.payload.id));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Load user data when user logs in
  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser.id) {
      dispatch(loadUserData(currentUser.id));
    }
  }, [isAuthenticated, currentUser, dispatch]);

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  // Show loading spinner during initial authentication check
  if (initialLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <h2>🚀 AI NAECO BLUE</h2>
          <p>Initializing Portal...</p>
        </div>
        {/* Dark Mode Toggle - visible during loading */}
        <DarkModeToggle />
      </div>
    );
  }

  // Show dashboard if user is authenticated
  if (isAuthenticated && currentUser) {
    return <UserDashboard />;
  }

  // Show appropriate auth form
  return (
    <div className="auth-wrapper">
      {authMode === 'login' ? (
        <LoginForm onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      )}
      
      {/* Dark Mode Toggle - visible on auth forms */}
      <DarkModeToggle />
    </div>
  );
};

export default AuthWrapper;