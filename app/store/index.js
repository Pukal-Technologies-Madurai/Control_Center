// app/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,  // Example reducer
  },
});

export default store;  // Default export
