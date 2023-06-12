import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.detailBookState || initialState;

export const selectDetailBook = createSelector([selectSlice], (state) => state);
