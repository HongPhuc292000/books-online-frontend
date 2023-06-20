import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { DetailOrder } from "types";

import orderServices from "services/order";
import { detailOrderAction as actions } from ".";

function* getDetailOrder(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailOrder = yield call(
      orderServices.getDetailOrder,
      action.payload
    );
    yield put(actions.getDetailOrderSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

function* cancelOrder(
  action: PayloadAction<string, string, (err?: any) => void>
) {
  try {
    yield call(orderServices.cancelOrder, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* detailOrderSaga() {
  yield takeLatest(actions.getDetailOrder, getDetailOrder);
  yield takeLatest(actions.cancelOrder, cancelOrder);
}
