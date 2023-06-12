export * from "./PageHeader";
export * from "./Auth";
export * from "./User";
export * from "./Book";
export * from "./Discount";

export * from "./Filter";

export type { SelectEnum, EnableEnum } from "./enums";

export interface Pageable<T> {
  data?: T[];
  total?: number;
  page?: number;
  size?: number;
}
