import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/slices/authSlice';

const LoginForm = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }
    
    // Dispatch login action
    dispatch(loginUser({
      username: formData.username.trim(),
      password: formData.password
    }));
  };

  const handleDemoLogin = (demoUser) => {
    setFormData({
      username: demoUser.username,
      password: demoUser.password
    });
  };

  const demoUsers = [
    { username: 'subhan', password: 'password123', name: 'Subhan Ahmad' },
    { username: 'ahmed', password: 'password123', name: 'Ahmed Khan' },
    { username: 'fatima', password: 'password123', name: 'Fatima Ali' }
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🚀 AI NAECO BLUE</h1>
          <h2>Internship Portal</h2>
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? '🔄 Signing In...' : '🔐 Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or try demo accounts</span>
        </div>

        <div className="demo-accounts">
          <h4>Demo Accounts:</h4>
          <div className="demo-buttons">
            {demoUsers.map((user, index) => (
              <button
                key={index}
                type="button"
                className="demo-button"
                onClick={() => handleDemoLogin(user)}
                disabled={loading}
              >
                👤 {user.name}
              </button>
            ))}
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account? 
            <button 
              type="button" 
              className="link-button"
              onClick={onSwitchToRegister}
              disabled={loading}
            >
              Create Account
            </button>
          </p>
        </div>

        <div className="features-preview">
          <h4>✨ Portal Features:</h4>
          <ul>
            <li>📊 Personal progress tracking</li>
            <li>💻 LeetCode problem history</li>
            <li>📚 Learning journey timeline</li>
            <li>🚀 Project showcase</li>
            <li>📈 Statistics & achievements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;