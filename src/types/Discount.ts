import { DiscountTypeEnum } from "./enums";

export interface Discount {
  _id: string;
  code: string;
  type: DiscountTypeEnum;
  description: string;
  value: number;
  amount: number;
  exp: number;
  used?: number;
  enable: boolean;
}
