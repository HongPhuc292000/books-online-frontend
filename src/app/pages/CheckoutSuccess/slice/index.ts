import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailOrder } from "types/Order";
import { CheckoutSuccessState } from "./types";

export const initialState: CheckoutSuccessState = {};

export const checkoutSuccessSlice = createSlice({
  name: "checkoutSuccess",
  initialState,
  reducers: {
    updateCheckout: {
      reducer() {},
      prepare(payload: string, meta: () => void) {
        return { payload, meta };
      },
    },
    updateCheckoutSuccess(
      state,
      action: PayloadAction<DetailOrder | undefined>
    ) {
      state.checkoutSuccessDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: checkoutSuccessActions } = checkoutSuccessSlice;

export default checkoutSuccessSlice.reducer;
