import { HomeState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookFilter, Filter, Pageable } from "types";

export const initialState: HomeState = {};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getAllBestSellingBooks: {
      reducer() {},
      prepare(payload: BookFilter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllBestSellingBooksSuccess(
      state,
      action: PayloadAction<Pageable<Book>>
    ) {
      state.listBestSellingBooks = action.payload;
    },
    getAllNewBooks: {
      reducer() {},
      prepare(payload: BookFilter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllNewBooksSuccess(state, action: PayloadAction<Pageable<Book>>) {
      state.listNewBooks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: homeActions } = homeSlice;

export default homeSlice.reducer;
