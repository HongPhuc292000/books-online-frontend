import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import discountService from "services/discount";
import orderServices from "services/order";
import { Discount, DiscountFilter, Pageable } from "types";
import {
  AddProductToCart,
  DetailOrder,
  OrderRequest,
  RemoveProductIncart,
} from "types/Order";
import { cartActions as actions } from ".";

function* getCartDetail(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailOrder | string = yield call(
      orderServices.getDetailCart,
      action.payload
    );
    if (typeof result === "string") {
      yield put(actions.getCartDetailSuccess(undefined));
      yield put(actions.setTotalProductInCart(0));
      action.meta();
    } else {
      const totalProductsInCart = result.products.length;
      yield put(actions.getCartDetailSuccess(result));
      yield put(actions.setTotalProductInCart(totalProductsInCart));
      action.meta();
    }
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("get_detail_cart_failure");
    }
  }
}

function* addProductToCart(
  action: PayloadAction<AddProductToCart, string, (error?: any) => void>
) {
  try {
    yield call(orderServices.addProductToCart, action.payload);
    const result: DetailOrder = yield call(
      orderServices.getDetailCart,
      action.payload.customerId
    );
    if (result) {
      const totalProductsInCart = result.products.length;
      yield put(actions.getCartDetailSuccess(result));
      yield put(actions.setTotalProductInCart(totalProductsInCart));
      action.meta();
    } else {
      action.meta();
    }
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("add_product_to_cart_failure");
    }
  }
}

function* removeProductInCart(
  action: PayloadAction<RemoveProductIncart, string, (error?: any) => void>
) {
  try {
    yield call(orderServices.removeProductInCart, action.payload);
    const result: DetailOrder = yield call(
      orderServices.getDetailCart,
      action.payload.customerId
    );
    if (result) {
      const totalProductsInCart = result.products.length;
      yield put(actions.getCartDetailSuccess(result));
      yield put(actions.setTotalProductInCart(totalProductsInCart));
      action.meta();
    } else {
      action.meta();
    }
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

function* getAllDiscounts(action: PayloadAction<DiscountFilter>) {
  try {
    const result: Pageable<Discount> = yield call(
      discountService.getListDiscounts,
      action.payload
    );
    yield put(actions.getAllDiscountsSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* checkoutOfflined(
  action: PayloadAction<
    { id: string; formValue: OrderRequest },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formValue } = action.payload;
    yield call(orderServices.checkoutOfflined, id, formValue);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

function* checkoutOnline(
  action: PayloadAction<
    { id: string; formValue: OrderRequest },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formValue } = action.payload;
    const response: { url: string } = yield call(orderServices.checkoutOnline, {
      id: id,
      formValue: formValue,
    });
    window.location.assign(response.url);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("unexpected_error");
    }
  }
}

export function* cartSaga() {
  yield takeLatest(actions.getCartDetail.type, getCartDetail);
  yield takeLatest(actions.addProductToCart.type, addProductToCart);
  yield takeLatest(actions.removeProductInCart.type, removeProductInCart);
  yield takeLatest(actions.getAllDiscounts.type, getAllDiscounts);
  yield takeLatest(actions.checkoutOfflined.type, checkoutOfflined);
  yield takeLatest(actions.checkoutOnline.type, checkoutOnline);
}
