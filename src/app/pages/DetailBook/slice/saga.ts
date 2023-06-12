import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookServices from "services/bookServices";
import { DetailBook } from "types";

import { detailBookAction as actions } from ".";
import { AddProductToCart } from "types/Order";
import orderServices from "services/order";

function* getDetailBook(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailBook = yield call(
      bookServices.getDetailBook,
      action.payload
    );
    yield put(actions.getDetailBookSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* detailBookSaga() {
  yield takeLatest(actions.getDetailBook, getDetailBook);
}
