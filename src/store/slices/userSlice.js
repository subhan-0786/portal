import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to load user's personal data
export const loadUserData = createAsyncThunk(
  'user/loadUserData',
  async (userId, { rejectWithValue }) => {
    try {
      // Try to load user data from localStorage first
      const storedData = localStorage.getItem(`userData_${userId}`);
      if (storedData) {
        return JSON.parse(storedData);
      }
      
      // If not in localStorage, try to load from JSON file
      try {
        const response = await fetch(`/data/userData/${userId}_data.json`);
        if (response.ok) {
          const data = await response.json();
          // Save to localStorage for future use
          localStorage.setItem(`userData_${userId}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        // File might not exist for new users, that's okay
      }
      
      // Return default empty data structure for new users
      const defaultData = {
        userId: userId,
        leetcode: [],
        learning: [],
        projects: [],
        overview: [],
        stats: {
          daysOfLeetCode: 0,
          problemsSolved: 0,
          weeksCompleted: 0,
          projectsCompleted: 0,
        },
      };
      
      // Save default data to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(defaultData));
      return defaultData;
      
    } catch (error) {
      return rejectWithValue('Failed to load user data');
    }
  }
);

// Async thunk to save user progress
export const saveUserData = createAsyncThunk(
  'user/saveUserData',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      // Save to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(data));
      
      // In a real app, you'd also save to your backend/database here
      // await saveToBackend(userId, data);
      
      return data;
    } catch (error) {
      return rejectWithValue('Failed to save user data');
    }
  }
);

// Async thunk to add new LeetCode problem
export const addLeetCodeProblem = createAsyncThunk(
  'user/addLeetCodeProblem',
  async ({ userId, problemData }, { getState, rejectWithValue }) => {
    try {
      const currentData = getState().user;
      const updatedLeetcode = [...currentData.leetcodeData, problemData];
      
      // Update stats
      const updatedStats = {
        ...currentData.stats,
        problemsSolved: updatedLeetcode.reduce((total, day) => total + day.problems.length, 0),
        daysOfLeetCode: updatedLeetcode.length,
      };
      
      const updatedData = {
        ...currentData,
        leetcodeData: updatedLeetcode,
        stats: updatedStats,
      };
      
      // Save to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(updatedData));
      
      return { leetcode: updatedLeetcode, stats: updatedStats };
    } catch (error) {
      return rejectWithValue('Failed to add LeetCode problem');
    }
  }
);

// Async thunk to add new project
export const addProject = createAsyncThunk(
  'user/addProject',
  async ({ userId, projectData }, { getState, rejectWithValue }) => {
    try {
      const currentData = getState().user;
      const updatedProjects = [...currentData.projects, projectData];
      
      // Update stats
      const updatedStats = {
        ...currentData.stats,
        projectsCompleted: updatedProjects.length,
      };
      
      const updatedData = {
        ...currentData,
        projects: updatedProjects,
        stats: updatedStats,
      };
      
      // Save to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(updatedData));
      
      return { projects: updatedProjects, stats: updatedStats };
    } catch (error) {
      return rejectWithValue('Failed to add project');
    }
  }
);

// Async thunk to update learning progress
export const updateLearningProgress = createAsyncThunk(
  'user/updateLearningProgress',
  async ({ userId, learningData }, { getState, rejectWithValue }) => {
    try {
      const currentData = getState().user;
      const updatedLearning = [...currentData.learningDays, learningData];
      
      // Update stats - calculate weeks completed
      const weeksCompleted = Math.ceil(updatedLearning.length / 5); // Assuming 5 days per week
      
      const updatedStats = {
        ...currentData.stats,
        weeksCompleted: weeksCompleted,
      };
      
      const updatedData = {
        ...currentData,
        learningDays: updatedLearning,
        stats: updatedStats,
      };
      
      // Save to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(updatedData));
      
      return { learning: updatedLearning, stats: updatedStats };
    } catch (error) {
      return rejectWithValue('Failed to update learning progress');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    leetcodeData: [],
    learningDays: [],
    projects: [],
    overview: [],
    stats: {
      daysOfLeetCode: 0,
      problemsSolved: 0,
      weeksCompleted: 0,
      projectsCompleted: 0,
    },
    loading: false,
    error: null,
    dataLoaded: false,
  },
  reducers: {
    clearUserData: (state) => {
      state.leetcodeData = [];
      state.learningDays = [];
      state.projects = [];
      state.overview = [];
      state.stats = {
        daysOfLeetCode: 0,
        problemsSolved: 0,
        weeksCompleted: 0,
        projectsCompleted: 0,
      };
      state.dataLoaded = false;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    // Manual data update reducers (for immediate UI updates)
    addLeetCodeDay: (state, action) => {
      state.leetcodeData.push(action.payload);
      state.stats.daysOfLeetCode = state.leetcodeData.length;
      state.stats.problemsSolved = state.leetcodeData.reduce(
        (total, day) => total + day.problems.length, 0
      );
    },
    updateProject: (state, action) => {
      const { index, projectData } = action.payload;
      if (state.projects[index]) {
        state.projects[index] = { ...state.projects[index], ...projectData };
      }
    },
    deleteProject: (state, action) => {
      const index = action.payload;
      state.projects.splice(index, 1);
      state.stats.projectsCompleted = state.projects.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load user data cases
      .addCase(loadUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.dataLoaded = true;
        const { leetcode, learning, projects, overview, stats } = action.payload;
        state.leetcodeData = leetcode || [];
        state.learningDays = learning || [];
        state.projects = projects || [];
        state.overview = overview || [];
        state.stats = stats || state.stats;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Save user data cases
      .addCase(saveUserData.fulfilled, (state, action) => {
        // Data is already updated in state, just confirm save succeeded
        state.error = null;
      })
      .addCase(saveUserData.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Add LeetCode problem cases
      .addCase(addLeetCodeProblem.fulfilled, (state, action) => {
        state.leetcodeData = action.payload.leetcode;
        state.stats = action.payload.stats;
      })
      .addCase(addLeetCodeProblem.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Add project cases
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        state.stats = action.payload.stats;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Update learning progress cases
      .addCase(updateLearningProgress.fulfilled, (state, action) => {
        state.learningDays = action.payload.learning;
        state.stats = action.payload.stats;
      })
      .addCase(updateLearningProgress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { 
  clearUserData, 
  updateStats, 
  clearError,
  addLeetCodeDay,
  updateProject,
  deleteProject
} = userSlice.actions;

export default userSlice.reducer;