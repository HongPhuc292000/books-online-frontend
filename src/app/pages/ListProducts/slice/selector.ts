import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.listBooksState || initialState;

export const selectListBooks = createSelector([selectSlice], (state) => state);
