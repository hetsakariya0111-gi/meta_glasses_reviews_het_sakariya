import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme') || 'dark';

const initialState = {
  theme: savedTheme,
  loading: false,
  toast: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    }
  }
});

export const { toggleTheme, setLoading, setToast } = uiSlice.actions;
export default uiSlice.reducer;
