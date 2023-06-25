import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Discount, DiscountFilter, Pageable } from "types";
import {
  AddProductToCart,
  DetailOrder,
  OrderRequest,
  RemoveProductIncart,
} from "types/Order";
import { CartState } from "./types";

export const initialState: CartState = {
  filterCode: { page: 0, size: 10, minDate: moment().valueOf(), status: true },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartDetail: {
      reducer() {},
      prepare(customerId: string, meta: (error?: any) => void) {
        return { payload: customerId, meta };
      },
    },
    getCartDetailSuccess(
      state,
      action: PayloadAction<DetailOrder | undefined>
    ) {
      state.detailCart = action.payload;
    },
    setTotalProductInCart(state, action: PayloadAction<number>) {
      state.totalProductInCart = action.payload;
    },
    addProductToCart: {
      reducer() {},
      prepare(payload: AddProductToCart, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    removeProductInCart: {
      reducer() {},
      prepare(payload: RemoveProductIncart, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    setOrderForm(state, action: PayloadAction<OrderRequest | undefined>) {
      state.orderForm = action.payload;
    },
    getAllDiscounts: {
      reducer() {},
      prepare(payload: DiscountFilter) {
        return { payload };
      },
    },
    getAllDiscountsSuccess(state, action: PayloadAction<Pageable<Discount>>) {
      state.listCodesForOrder = action.payload;
    },
    setFilterCode(state, action: PayloadAction<DiscountFilter>) {
      state.filterCode = action.payload;
    },
    setSelectedDiscountCode(
      state,
      action: PayloadAction<Discount | undefined>
    ) {
      state.selectedDiscountCode = action.payload;
    },
    checkoutOfflined: {
      reducer() {},
      prepare(
        payload: { id: string; formValue: OrderRequest },
        meta: (error?: any) => void
      ) {
        return { payload, meta };
      },
    },
    checkoutOnline: {
      reducer() {},
      prepare(
        payload: { id: string; formValue: OrderRequest },
        meta: (error?: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: cartActions } = cartSlice;

export default cartSlice.reducer;
