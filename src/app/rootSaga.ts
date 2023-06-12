import { all } from "redux-saga/effects";
import { authSaga } from "app/components/PageHeader/slice/saga";
import { homeSaga } from "app/pages/Home/slice/saga";
import { detailBookSaga } from "./pages/DetailBook/slice/saga";
import { cartSaga } from "./pages/Cart/slice/saga";
import { listBooksSaga } from "./pages/ListProducts/slice/saga";
import { checkoutSuccessSaga } from "./pages/CheckoutSuccess/slice/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    homeSaga(),
    detailBookSaga(),
    cartSaga(),
    listBooksSaga(),
    checkoutSuccessSaga(),
  ]);
}
