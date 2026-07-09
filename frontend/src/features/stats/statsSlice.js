import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  overview: {},
  monthly: [],
  loading: false,
  error: null
};

export const fetchStats = createAsyncThunk('stats/fetch', async (_, thunkAPI) => {
  try {
    const [average, positive, topReviewers, mostHelpful, verified] = await Promise.all([
      api.get('/stats/average-rating'),
      api.get('/stats/positive-reviews'),
      api.get('/stats/top-reviewers'),
      api.get('/stats/most-helpful'),
      api.get('/stats/verified-purchases')
    ]);

    return {
      average: average.data,
      positive: positive.data,
      topReviewers: topReviewers.data,
      mostHelpful: mostHelpful.data,
      verified: verified.data
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
  }
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default statsSlice.reducer;
