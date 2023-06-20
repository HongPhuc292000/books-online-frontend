import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, DetailBook, Pageable } from "types";
import { DetailBookState } from "./types";

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
    getAllBooksSameAuthorSuccess(
      state,
      action: PayloadAction<Pageable<Book> | undefined>
    ) {
      state.listBookSameAuthor = action.payload;
    },
    getAllBestSellingBooksSuccess(
      state,
      action: PayloadAction<Pageable<Book> | undefined>
    ) {
      state.listBestSellingBooks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: detailBookAction } = detailBookSlice;

export default detailBookSlice.reducer;
