import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.homeState || initialState;

export const selectHome = createSelector([selectSlice], (state) => state);
