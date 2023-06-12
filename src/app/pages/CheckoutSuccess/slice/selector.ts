import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) =>
  state.checkoutSuccessStateState || initialState;

export const selectCheckoutSuccess = createSelector(
  [selectSlice],
  (state) => state
);
