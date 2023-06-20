import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookService from "services/bookServices";
import { Book, BookFilter, Pageable } from "types";
import { listBooksActions as actions } from ".";

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
