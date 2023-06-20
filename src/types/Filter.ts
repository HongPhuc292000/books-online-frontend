import { OrderStatusesEnum } from "./enums";

export interface Filter {
  searchKey?: string;
  page?: number;
  size?: number;
}

export interface BookFilter extends Filter {
  isNew?: boolean;
  bestSaled?: boolean;
  inStock?: boolean;
  sort?: string;
  authorId?: string;
  exceptId?: string;
}

export interface DiscountFilter extends Filter {
  minDate?: number;
  all?: boolean;
  status?: boolean;
}

export interface OrderFilter extends Filter {
  customerId?: string;
  status?: OrderStatusesEnum;
}
