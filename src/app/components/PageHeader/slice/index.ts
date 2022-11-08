import { HomeState } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthParams } from "types";

export const initialState: HomeState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // getProducts() {},
    // getProductssSuccess(state, action: PayloadAction<Pageable<ProductI>>) {
    //   state.products = action.payload;
    // },
    login: {
      reducer() {},
      prepare(params: AuthParams, meta: () => void) {
        return { payload: params, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;

export default authSlice.reducer;
