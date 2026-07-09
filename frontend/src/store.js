import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import reviewsReducer from './features/reviews/reviewsSlice';
import statsReducer from './features/stats/statsSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    stats: statsReducer,
    ui: uiReducer
  }
});

export default store;
