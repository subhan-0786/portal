import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Direct import of users data
import usersData from '../../data/users.json';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { getState, rejectWithValue }) => {
    try {
      console.log('🔍 Login attempt:', { username, password }); // Debug log
      
      // Get current users from state (includes newly registered users)
      const currentState = getState();
      const currentUsers = currentState.auth.users;
      
      console.log('📄 Current users in state:', currentUsers); // Debug log
      
      // Find user with matching credentials from current state
      const user = currentUsers.find(
        u => u.username === username && u.password === password
      );
      
      console.log('👤 Found user:', user); // Debug log
      
      if (user) {
        // Remove password from returned user data for security
        const { password: _, ...userWithoutPassword } = user;
        
        // Save to localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('isAuthenticated', 'true');
        
        console.log('✅ Login successful:', userWithoutPassword); // Debug log
        return userWithoutPassword;
      } else {
        console.log('❌ User not found or wrong credentials'); // Debug log
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      console.error('💥 Login error:', error); // Debug log
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().auth;
      
      // Check if username already exists
      const existingUser = users.find(u => u.username === userData.username);
      if (existingUser) {
        return rejectWithValue('Username already exists');
      }
      
      // Check if email already exists
      const existingEmail = users.find(u => u.email === userData.email);
      if (existingEmail) {
        return rejectWithValue('Email already registered');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        username: userData.username,
        email: userData.email,
        password: userData.password, // In real app, hash this!
        fullName: userData.fullName,
        role: 'intern',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: userData.avatar || '👨‍💻'
      };
      
      // Add to current users array
      const updatedUsers = [...users, newUser];
      
      // Save updated users list to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Don't auto-login - just return success info
      console.log('✨ User registered successfully:', newUser.fullName); // Debug log
      
      return { 
        newUser: { 
          username: newUser.username, 
          fullName: newUser.fullName,
          email: newUser.email 
        }, 
        allUsers: updatedUsers,
        message: 'Registration successful! Please sign in with your credentials.' 
      };
    } catch (error) {
      console.error('💥 Registration error:', error); // Debug log
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

// Async thunk to load users from storage/JSON
export const loadUsersFromStorage = createAsyncThunk(
  'auth/loadUsersFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      // Always start with the base demo users from JSON
      const baseDemoUsers = usersData.users;
      console.log('📁 Base demo users:', baseDemoUsers); // Debug log
      
      // Try to load additional users from localStorage
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        console.log('📦 Loading users from localStorage'); // Debug log
        const parsedUsers = JSON.parse(storedUsers);
        console.log('👥 Stored users:', parsedUsers); // Debug log
        
        // Merge: keep demo users + add any new registered users
        const allUsers = [...baseDemoUsers];
        
        // Add users from localStorage that aren't already in demo users
        parsedUsers.forEach(storedUser => {
          const existsInDemo = baseDemoUsers.find(demo => demo.username === storedUser.username);
          if (!existsInDemo) {
            allUsers.push(storedUser);
          }
        });
        
        console.log('🔄 Final merged users:', allUsers); // Debug log
        
        // Update localStorage with merged list
        localStorage.setItem('users', JSON.stringify(allUsers));
        
        return allUsers;
      }
      
      // If no localStorage, just use demo users and save them
      console.log('📄 Using demo users only'); // Debug log
      localStorage.setItem('users', JSON.stringify(baseDemoUsers));
      
      return baseDemoUsers;
    } catch (error) {
      console.error('💥 Error loading users:', error); // Debug log
      // Fallback to demo users if there's an issue
      return usersData.users;
    }
  }
);

// Async thunk to check existing session
export const checkExistingSession = createAsyncThunk(
  'auth/checkExistingSession',
  async (_, { rejectWithValue }) => {
    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const currentUser = localStorage.getItem('currentUser');
      
      if (isAuthenticated === 'true' && currentUser) {
        console.log('🔄 Restoring session for user:', JSON.parse(currentUser)); // Debug log
        return JSON.parse(currentUser);
      }
      
      return null;
    } catch (error) {
      console.error('💥 Session check error:', error); // Debug log
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
    users: [],
    loading: false,
    error: null,
    registrationSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      console.log('👋 User logged out'); // Debug log
    },
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.currentUser = null;
      })
      
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Don't set isAuthenticated to true - keep user logged out
        state.isAuthenticated = false;
        state.currentUser = null;
        state.users = action.payload.allUsers; // Update users in state
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })
      
      // Load users cases
      .addCase(loadUsersFromStorage.fulfilled, (state, action) => {
        state.users = action.payload;
        console.log('🔄 Users loaded into state:', action.payload); // Debug log
      })
      .addCase(loadUsersFromStorage.rejected, (state, action) => {
        console.error('💥 Failed to load users:', action.payload); // Debug log
      })
      
      // Check session cases
      .addCase(checkExistingSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.currentUser = action.payload;
        }
      });
  },
});

export const { 
  logout, 
  clearError, 
  clearRegistrationSuccess, 
  updateCurrentUser 
} = authSlice.actions;

export default authSlice.reducer;