import { OrderStatusesEnum, PaymentTypeEnum } from "./enums";

export interface DetailBookByCode {
  productId: string;
  bookCode: string;
  imageUrl: string;
  name: string;
  amount: number;
  defaultPrice: number;
  reducedPrice?: number;
}

export interface AddProductToCart extends DetailBookByCode {
  customerId: string;
  isInsertAmount?: boolean;
}

export interface DetailOrder {
  _id: string;
  orderCode?: string;
  customerId: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress?: string;
  paymentType: PaymentTypeEnum;
  products: DetailBookByCode[];
  status: OrderStatusesEnum;
  orderPrices?: number;
  shipPrices?: number;
  shipDiscountPrices?: number;
  orderDiscountId?: string;
  orderDiscountPrices?: number;
  totalPrices?: number;
  checkout: boolean;
  createdAt: string;
  editAt: string;
}

export interface OrderRequest {
  customerId: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress?: string;
  paymentType: PaymentTypeEnum;
  products: DetailBookByCode[];
  orderPrices: number;
  orderDiscountId?: string;
  orderDiscountPrices?: number;
  totalPrices: number;
  status: OrderStatusesEnum;
  checkout?: boolean;
}

export interface RemoveProductIncart {
  customerId: string;
  productId: string;
}

export interface Order {
  _id: string;
  customerAdress: string;
  checkout: boolean;
  orderCode: number;
  orderDiscountPrices: number;
  totalPrices: number;
  products: DetailBookByCode[];
  status: OrderStatusesEnum;
}
