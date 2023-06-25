import { Discount, DiscountFilter, Pageable } from "types";
import { DetailOrder, OrderRequest } from "types/Order";

/* --- STATE --- */
export interface CartState {
  totalProductInCart?: number;
  detailCart?: DetailOrder;
  orderForm?: OrderRequest;
  listCodesForOrder?: Pageable<Discount>;
  filterCode: DiscountFilter;
  selectedDiscountCode?: Discount;
}
