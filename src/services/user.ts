import { AddEditCustomerRequest, UserDetail } from "types";
import { createService } from "./axios";
import { baseUrl } from "utils/constants";

const instanceWithToken = createService(baseUrl);

const getDetailUser = async (userId: string): Promise<UserDetail> => {
  const response = await instanceWithToken.get(`v1/profile/customer/${userId}`);
  return response.data;
};

const editUser = async (id: string, formValue: AddEditCustomerRequest) => {
  const response = await instanceWithToken.put(
    `v1/profile/customer/${id}`,
    formValue
  );
  return response.data;
};

const userService = { getDetailUser, editUser };

export default userService;
