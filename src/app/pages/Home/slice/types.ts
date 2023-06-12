import { Book, Pageable } from "types";

/* --- STATE --- */
export interface HomeState {
  listBestSellingBooks?: Pageable<Book>;
  listNewBooks?: Pageable<Book>;
}
