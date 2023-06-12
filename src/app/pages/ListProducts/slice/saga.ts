import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import orderServices from "services/order";
import userService from "services/user";
import {
  Book,
  BookFilter,
  Discount,
  DiscountFilter,
  LoginRequest,
  LoginResponse,
  Pageable,
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
import { listBooksActions as actions } from ".";
import {
  AddProductToCart,
  DetailOrder,
  RemoveProductIncart,
} from "types/Order";
import discountService from "services/discount";
import bookService from "services/bookServices";

function* getAllBooks(
  action: PayloadAction<BookFilter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Book> = yield call(
      bookService.getAllBooks,
      action.payload
    );
    yield put(actions.getAllBooksSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* listBooksSaga() {
  yield takeLatest(actions.getAllBooks.type, getAllBooks);
}
