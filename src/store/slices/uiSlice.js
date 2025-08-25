import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    // Navigation state
    activeSection: 'overview',
    
    // Modal states
    showLoginModal: false,
    showRegisterModal: false,
    showAddProblemModal: false,
    showAddProjectModal: false,
    showUserProfileModal: false,
    
    // Loading states for different operations
    globalLoading: false,
    authLoading: false,
    dataLoading: false,
    
    // Notification system
    notifications: [],
    
    // Theme state (can work alongside your existing context)
    theme: 'light', // 'light' | 'dark'
    
    // Dashboard view preferences
    dashboardView: 'grid', // 'grid' | 'list'
    
    // Sidebar state (for mobile/responsive)
    sidebarOpen: true,
    
    // Filter and sort preferences
    filters: {
      dateRange: 'all', // 'week' | 'month' | 'all'
      projectStatus: 'all', // 'completed' | 'in-progress' | 'all'
      difficulty: 'all', // 'easy' | 'medium' | 'hard' | 'all'
    },
    
    sortBy: 'date', // 'date' | 'name' | 'difficulty'
    sortOrder: 'desc', // 'asc' | 'desc'
  },
  reducers: {
    // Navigation
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    
    // Modal management
    openModal: (state, action) => {
      const modalName = action.payload;
      state[`show${modalName}Modal`] = true;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      state[`show${modalName}Modal`] = false;
    },
    closeAllModals: (state) => {
      state.showLoginModal = false;
      state.showRegisterModal = false;
      state.showAddProblemModal = false;
      state.showAddProjectModal = false;
      state.showUserProfileModal = false;
    },
    
    // Loading states
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload;
    },
    
    // Notification system
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload, // { type: 'success|error|info|warning', message: 'text', duration?: number }
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // Theme management
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    
    // Dashboard view
    setDashboardView: (state, action) => {
      state.dashboardView = action.payload;
      localStorage.setItem('dashboardView', state.dashboardView);
    },
    
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Filters and sorting
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        dateRange: 'all',
        projectStatus: 'all',
        difficulty: 'all',
      };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    
    // Bulk actions for better UX
    setUserPreferences: (state, action) => {
      const { theme, dashboardView, filters, sortBy, sortOrder } = action.payload;
      if (theme) state.theme = theme;
      if (dashboardView) state.dashboardView = dashboardView;
      if (filters) state.filters = { ...state.filters, ...filters };
      if (sortBy) state.sortBy = sortBy;
      if (sortOrder) state.sortOrder = sortOrder;
    },
    
    // Initialize UI state from localStorage
    initializeUIFromStorage: (state) => {
      const savedTheme = localStorage.getItem('theme');
      const savedDashboardView = localStorage.getItem('dashboardView');
      const savedFilters = localStorage.getItem('filters');
      const savedSort = localStorage.getItem('sortPreferences');
      
      if (savedTheme) {
        state.theme = savedTheme;
      }
      if (savedDashboardView) {
        state.dashboardView = savedDashboardView;
      }
      if (savedFilters) {
        try {
          state.filters = { ...state.filters, ...JSON.parse(savedFilters) };
        } catch (e) {
          // Ignore invalid JSON
        }
      }
      if (savedSort) {
        try {
          const { sortBy, sortOrder } = JSON.parse(savedSort);
          if (sortBy) state.sortBy = sortBy;
          if (sortOrder) state.sortOrder = sortOrder;
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    },
    
    // Reset UI state
    resetUIState: (state) => {
      state.activeSection = 'overview';
      state.showLoginModal = false;
      state.showRegisterModal = false;
      state.showAddProblemModal = false;
      state.showAddProjectModal = false;
      state.showUserProfileModal = false;
      state.globalLoading = false;
      state.authLoading = false;
      state.dataLoading = false;
      state.notifications = [];
      state.dashboardView = 'grid';
      state.sidebarOpen = true;
      state.filters = {
        dateRange: 'all',
        projectStatus: 'all',
        difficulty: 'all',
      };
      state.sortBy = 'date';
      state.sortOrder = 'desc';
    },
  },
});

export const {
  // Navigation
  setActiveSection,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Loading
  setGlobalLoading,
  setAuthLoading,
  setDataLoading,
  
  // Notifications
  addNotification,
  removeNotification,
  clearAllNotifications,
  
  // Theme
  toggleTheme,
  setTheme,
  
  // Dashboard
  setDashboardView,
  
  // Sidebar
  toggleSidebar,
  setSidebarOpen,
  
  // Filters and sorting
  setFilter,
  resetFilters,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  
  // Bulk actions
  setUserPreferences,
  initializeUIFromStorage,
  resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;