import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderFilter, Pageable } from "types";
import { ListOrdersState } from "./types";

export const initialState: ListOrdersState = {};

export const listOrdersSlice = createSlice({
  name: "listOrders",
  initialState,
  reducers: {
    getAllOrders: {
      reducer() {},
      prepare(payload: OrderFilter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllOrdersSuccess(
      state,
      action: PayloadAction<Pageable<Order> | undefined>
    ) {
      state.listOrders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: listOrdersActions } = listOrdersSlice;

export default listOrdersSlice.reducer;
