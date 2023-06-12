import querystring from "query-string";
import { Pageable, Discount, DiscountFilter } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListDiscounts = async (
  params: DiscountFilter
): Promise<Pageable<Discount>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/discount?${query}`);
  return response.data;
};

const discountService = {
  getListDiscounts,
};

export default discountService;
