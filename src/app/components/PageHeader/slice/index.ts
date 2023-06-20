import { AuthState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, RegisterRequest, SignModalStatus } from "types";
import { AddEditCustomerRequest, UserDetail } from "types/User";

export const initialState: AuthState = {
  signModalStatus: {
    show: false,
    login: true,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer() {},
      prepare(params: LoginRequest, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    loginSuccess(state, action: PayloadAction<string | undefined>) {
      state.authToken = action.payload;
    },
    register: {
      reducer() {},
      prepare(params: RegisterRequest, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
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
    setShowSignModal(state, action: PayloadAction<SignModalStatus>) {
      state.signModalStatus = action.payload;
    },
    editCustomer: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: AddEditCustomerRequest;
          file: null | File;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;

export default authSlice.reducer;
