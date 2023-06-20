import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookServices from "services/bookServices";
import { Book, DetailBook, Pageable } from "types";

import { detailBookAction as actions } from ".";

function* getDetailBook(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailBook = yield call(
      bookServices.getDetailBook,
      action.payload
    );
    yield put(actions.getDetailBookSuccess(result));
    if (result?.authorId) {
      const resultGetSameBooks: Pageable<Book> = yield call(
        bookServices.getAllBooks,
        {
          page: 0,
          size: 8,
          authorId: result.authorId._id,
          exceptId: action.payload,
        }
      );
      yield put(actions.getAllBooksSameAuthorSuccess(resultGetSameBooks));
      if (resultGetSameBooks.data?.length === 0) {
        const resultGetBestSellingBooks: Pageable<Book> = yield call(
          bookServices.getAllBooks,
          { page: 0, size: 8, bestSaled: true }
        );
        yield put(
          actions.getAllBestSellingBooksSuccess(resultGetBestSellingBooks)
        );
      }
    }
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

// function* getAllBooksSameAuthor(
//   action: PayloadAction<BookFilter, string, (error?: any) => void>
// ) {
//   try {
//     const result: Pageable<Book> = yield call(
//       bookServices.getAllBooks,
//       action.payload
//     );
//     yield put(actions.getAllBooksSameAuthorSuccess(result));
//     action.meta();
//   } catch (error: any) {
//     if (error.response.data) {
//       action.meta(error.response.data);
//     } else {
//       action.meta("unexpected_error");
//     }
//   }
// }

export function* detailBookSaga() {
  yield takeLatest(actions.getDetailBook, getDetailBook);
  // yield takeLatest(actions.getAllBooksSameAuthor, getAllBooksSameAuthor);
}
