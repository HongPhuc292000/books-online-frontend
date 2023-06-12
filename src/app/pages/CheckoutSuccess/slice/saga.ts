import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import orderServices from "services/order";
import { DetailOrder } from "types/Order";
import { checkoutSuccessActions as actions } from ".";

function* updateCheckoutSuccess(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailOrder = yield call(
      orderServices.updateCheckoutSuccess,
      action.payload
    );
    yield put(actions.updateCheckoutSuccess(result));
    action.meta();
  } catch (error: any) {
    action.meta();
  }
}

export function* checkoutSuccessSaga() {
  yield takeLatest(actions.updateCheckout.type, updateCheckoutSuccess);
}
