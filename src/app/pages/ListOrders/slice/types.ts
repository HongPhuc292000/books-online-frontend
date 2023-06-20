import { Order, Pageable } from "types";

/* --- STATE --- */
export interface ListOrdersState {
  listOrders?: Pageable<Order>;
}
