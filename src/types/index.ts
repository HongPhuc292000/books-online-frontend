export * from "./PageHeader";
export * from "./Auth";
export * from "./User";
export * from "./Book";
export * from "./Discount";
export * from "./Order";

export * from "./Filter";

export type { SelectEnum, EnableEnum } from "./enums";

export interface Pageable<T> {
  data?: T[];
  total?: number;
  page?: number;
  size?: number;
}

export interface ImageFileType {
  file: File | null;
  url?: string;
}
