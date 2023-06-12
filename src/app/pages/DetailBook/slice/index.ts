import { DetailBookState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookFilter, DetailBook, Filter, Pageable } from "types";
import { AddProductToCart } from "types/Order";

export const initialState: DetailBookState = {};

export const detailBookSlice = createSlice({
  name: "detailBook",
  initialState,
  reducers: {
    getDetailBook: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailBookSuccess(state, action: PayloadAction<DetailBook | undefined>) {
      state.detailBook = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: detailBookAction } = detailBookSlice;

export default detailBookSlice.reducer;
