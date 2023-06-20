import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) =>
  state.detailOrderState || initialState;

export const selectDetailOrder = createSelector(
  [selectSlice],
  (state) => state
);
