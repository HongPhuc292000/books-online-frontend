import querystring from "query-string";
import { Book, BookFilter, Pageable } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";
import {
  AddProductToCart,
  OrderRequest,
  RemoveProductIncart,
} from "types/Order";

const instanceWithToken = createService(baseUrl);

const getDetailCart = async (id: string) => {
  const response = await instanceWithToken.get(`v1/customerOrder/incart/${id}`);
  return response.data;
};

const addProductToCart = async (formValue: AddProductToCart) => {
  const response = await instanceWithToken.post("v1/customerOrder", formValue);
  return response.data;
};

const removeProductInCart = async (formValue: RemoveProductIncart) => {
  const response = await instanceWithToken.post(
    "v1/customerOrder/removeProduct",
    formValue
  );
  return response.data;
};

const checkoutOfflined = async (id: string, formValue: OrderRequest) => {
  const response = await instanceWithToken.put(
    `v1/customerOrder/cod/${id}`,
    formValue
  );
  return response.data;
};

const checkoutOnline = async (data: {
  id: string;
  formValue: OrderRequest;
}) => {
  const response = await instanceWithToken.post(
    `v1/customerOrder/checkoutOnline`,
    data
  );
  return response.data;
};

const updateCheckoutSuccess = async (id: string) => {
  const response = await instanceWithToken.put(
    `v1/customerOrder/checkoutSuccess/${id}`
  );
  return response.data;
};

const orderServices = {
  getDetailCart,
  addProductToCart,
  removeProductInCart,
  checkoutOfflined,
  checkoutOnline,
  updateCheckoutSuccess,
};

export default orderServices;
