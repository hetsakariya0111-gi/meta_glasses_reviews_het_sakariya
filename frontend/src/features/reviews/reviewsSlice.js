import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  items: [],
  currentReview: null,
  loading: false,
  error: null,
  pagination: {},
  filters: {
    search: '',
    country: '',
    minRating: '',
    maxRating: '',
    verifiedPurchase: '',
    sort: '-createdAt'
  }
};

export const fetchReviews = createAsyncThunk('reviews/fetch', async (params = {}, thunkAPI) => {
  try {
    const query = new URLSearchParams({ ...params }).toString();
    const response = await api.get(`/reviews${query ? `?${query}` : ''}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
  }
});

export const fetchReviewById = createAsyncThunk('reviews/fetchOne', async (id, thunkAPI) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch review');
  }
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentReview: (state) => {
      state.currentReview = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearCurrentReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
