export interface Filter {
  searchKey?: string;
  page?: number;
  size?: number;
}

export interface BookFilter extends Filter {
  isNew?: boolean;
  bestSaled?: boolean;
  inStock?: boolean;
  sort?: number;
}

export interface DiscountFilter extends Filter {
  minDate?: number;
  all?: boolean;
  status?: boolean;
}
