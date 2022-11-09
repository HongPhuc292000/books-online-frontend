import { AuthState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginParams } from "types";
import { UserDetail } from "types/User";

export const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer() {},
      prepare(params: LoginParams, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    loginSuccess(state, action: PayloadAction<string | undefined>) {
      state.authToken = action.payload;
    },
    logout: {
      reducer() {},
      prepare(meta: (error?: any) => void) {
        return { payload: meta };
      },
    },
    getUserInfo: {
      reducer() {},
      prepare(userId: string, meta: (error?: any) => void) {
        return { payload: userId, meta };
      },
    },
    getUserInfoSuccess(state, action: PayloadAction<UserDetail>) {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;

export default authSlice.reducer;
