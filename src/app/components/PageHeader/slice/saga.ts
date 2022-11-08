import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import authService from "services/auth";
import { AuthParams, LoginResponse } from "types";
import { authActions as actions } from ".";

function* login(action: PayloadAction<AuthParams, string, () => void>) {
  try {
    const result: LoginResponse = yield call(authService.login, action.payload);
  } catch (error: any) {
    console.log("🚀 ~ file: function*listProducts", error);
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
}
