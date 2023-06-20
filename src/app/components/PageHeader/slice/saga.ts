import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authService from "services/auth";
import userService from "services/user";
import {
  AddEditCustomerRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserDetail,
} from "types";
import { Cookies } from "types/enums";
import {
  decodeTokenGetId,
  deleteCookie,
  getCookies,
  setCookie,
} from "utils/cookies";
import { authActions as actions } from ".";
import commonService from "services/common";

function* login(
  action: PayloadAction<LoginRequest, string, (error?: any) => void>
) {
  try {
    const result: LoginResponse = yield call(authService.login, action.payload);
    setCookie(Cookies.AUTHTOKEN, result.accessToken);
    setCookie(Cookies.REFRESHTOKEN, result.refreshToken);
    const userInfo: UserDetail = yield call(
      userService.getDetailUser,
      decodeTokenGetId(result.accessToken)
    );
    yield put(actions.getUserInfoSuccess(userInfo));
    yield put(actions.loginSuccess(result.accessToken));
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

function* register(
  action: PayloadAction<RegisterRequest, string, (error?: any) => void>
) {
  try {
    const registerResult: LoginRequest = yield call(
      authService.register,
      action.payload
    );
    const loginResult: LoginResponse = yield call(
      authService.login,
      registerResult
    );
    setCookie(Cookies.AUTHTOKEN, loginResult.accessToken);
    setCookie(Cookies.REFRESHTOKEN, loginResult.refreshToken);
    const userInfo: UserDetail = yield call(
      userService.getDetailUser,
      decodeTokenGetId(loginResult.accessToken)
    );
    yield put(actions.getUserInfoSuccess(userInfo));
    yield put(actions.loginSuccess(loginResult.accessToken));
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

function* logout(action: PayloadAction<(error?: any) => void>) {
  try {
    yield call(authService.logout);
    deleteCookie(Cookies.AUTHTOKEN);
    deleteCookie(Cookies.REFRESHTOKEN);
    yield put(actions.loginSuccess(undefined));
    action.payload();
  } catch {
    action.payload();
  }
}

function* getUserInfo(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const userInfo: UserDetail = yield call(
      userService.getDetailUser,
      action.payload
    );
    yield put(actions.getUserInfoSuccess(userInfo));
    yield put(actions.loginSuccess(getCookies(Cookies.AUTHTOKEN)));
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

function* editCustomer(
  action: PayloadAction<
    {
      id: string;
      formData: AddEditCustomerRequest;
      file: null | File;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData, file } = action.payload;
    if (file) {
      const newUrl: string = yield call(
        commonService.uploadImage,
        file,
        "customers"
      );
      yield call(userService.editUser, id, {
        ...formData,
        imageUrl: newUrl,
      });
    } else {
      yield call(userService.editUser, id, formData);
    }
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("edit_detail_user_failure");
    }
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.register.type, register);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.getUserInfo.type, getUserInfo);
  yield takeLatest(actions.editCustomer.type, editCustomer);
}
