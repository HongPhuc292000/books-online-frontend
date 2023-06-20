import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "app/components/PageHeader/slice/index";
import homeReducer from "app/pages/Home/slice";
import detailBookReducer from "app/pages/DetailBook/slice";
import cartReducer from "app/pages/Cart/slice";
import listBooksReducer from "app/pages/ListProducts/slice";
import checkoutSuccessReducer from "app/pages/CheckoutSuccess/slice";
import listOrdersReducer from "app/pages/ListOrders/slice";
import detailOrderReducer from "app/pages/DetailOrder/slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    authState: authReducer,
    homeState: homeReducer,
    detailBookState: detailBookReducer,
    cartState: cartReducer,
    listBooksState: listBooksReducer,
    checkoutSuccessStateState: checkoutSuccessReducer,
    listOrderState: listOrdersReducer,
    detailOrderState: detailOrderReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
