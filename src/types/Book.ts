import { EnableEnum } from ".";

interface AuthorInfo {
  _id: string;
  name: string;
}

interface CategoryInfo {
  _id: string;
  name: string;
}

export interface Book {
  _id: string;
  imageUrl: string;
  name: string;
  authorId?: AuthorInfo;
  view: number;
  amount: number;
  categoryIds: CategoryInfo[];
  defaultPrice: number;
  reducedPrice?: number;
  status: EnableEnum;
  createdAt: string;
}

export interface DetailBook {
  _id: string;
  imageUrl: string;
  name: string;
  bookCode: string;
  authorId: AuthorInfo;
  view: number;
  isFull: boolean;
  amount: number;
  categoryIds: CategoryInfo[];
  defaultPrice: number;
  reducedPrice?: number;
  description?: string;
  status: EnableEnum;
}
