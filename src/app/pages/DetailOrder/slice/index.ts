import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailOrder } from "types";
import { DetailOrderState } from "./types";

export const initialState: DetailOrderState = {};

export const detailOrderSlice = createSlice({
  name: "detailOrder",
  initialState,
  reducers: {
    getDetailOrder: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailOrderSuccess(
      state,
      action: PayloadAction<DetailOrder | undefined>
    ) {
      state.detailOrder = action.payload;
    },

    cancelOrder: {
      reducer() {},
      prepare(payload: string, meta: (err?: any) => void) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: detailOrderAction } = detailOrderSlice;

export default detailOrderSlice.reducer;
