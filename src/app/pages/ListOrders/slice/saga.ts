import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import orderServices from "services/order";
import { Order, OrderFilter, Pageable } from "types";
import { listOrdersActions as actions } from ".";

function* getAllOrders(
  action: PayloadAction<OrderFilter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Order> = yield call(
      orderServices.getAllOrders,
      action.payload
    );
    yield put(actions.getAllOrdersSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* listOrdersSaga() {
  yield takeLatest(actions.getAllOrders.type, getAllOrders);
}
