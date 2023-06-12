import { Book, Pageable } from "types";
import { DetailOrder } from "types/Order";

/* --- STATE --- */
export interface CheckoutSuccessState {
  checkoutSuccessDetail?: DetailOrder;
}
