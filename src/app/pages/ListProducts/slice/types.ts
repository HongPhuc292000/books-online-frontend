import { Book, BookFilter, Pageable } from "types";

/* --- STATE --- */
export interface ListBooksState {
  listBooks?: Pageable<Book>;
  filterListBooks?: BookFilter;
}
