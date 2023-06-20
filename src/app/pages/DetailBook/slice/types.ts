import { Book, DetailBook, Pageable } from "types";

/* --- STATE --- */
export interface DetailBookState {
  detailBook?: DetailBook;
  listBookSameAuthor?: Pageable<Book>;
  listBestSellingBooks?: Pageable<Book>;
}
