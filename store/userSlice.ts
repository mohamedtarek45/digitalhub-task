import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  role: string | null;
}

const initialState: UserState = {
  email: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    removeUser: (state) => {
      state.email = null;
      state.role = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
