import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.listOrderState || initialState;

export const selectListOrders = createSelector([selectSlice], (state) => state);
