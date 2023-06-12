import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookServices from "services/bookServices";
import { Book, BookFilter, Pageable } from "types";

import { homeActions as actions } from ".";

function* getAllBestSellingBooks(
  action: PayloadAction<BookFilter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Book> = yield call(
      bookServices.getAllBooks,
      action.payload
    );
    yield put(actions.getAllBestSellingBooksSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

function* getAllNewBooks(
  action: PayloadAction<BookFilter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Book> = yield call(
      bookServices.getAllBooks,
      action.payload
    );
    yield put(actions.getAllNewBooksSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* homeSaga() {
  yield takeLatest(actions.getAllBestSellingBooks, getAllBestSellingBooks);
  yield takeLatest(actions.getAllNewBooks, getAllNewBooks);
}
