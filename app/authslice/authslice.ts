import { createSlice } from '@reduxjs/toolkit';
import { RealtyApi } from '../appApi/api';

interface UserState {
  user: string | null; // Adjust the type to match your user schema
  isLogin: boolean;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
  
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
