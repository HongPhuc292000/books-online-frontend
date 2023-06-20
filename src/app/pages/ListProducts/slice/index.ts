import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookFilter, Pageable } from "types";
import { ListBooksState } from "./types";

export const initialState: ListBooksState = {
  filterListBooks: { page: 0, size: 12 },
};

export const listBooksSlice = createSlice({
  name: "listBooks",
  initialState,
  reducers: {
    getAllBooks: {
      reducer() {},
      prepare(payload: BookFilter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllBooksSuccess(
      state,
      action: PayloadAction<Pageable<Book> | undefined>
    ) {
      state.listBooks = action.payload;
    },
    setFilterListBooks(state, action: PayloadAction<BookFilter | undefined>) {
      state.filterListBooks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: listBooksActions } = listBooksSlice;

export default listBooksSlice.reducer;
