import { UserDetail } from "types";
import { createService } from "./axios";
import { baseUrl } from "utils/constants";

const instanceWithToken = createService(baseUrl);

const getDetailUser = async (userId: string): Promise<UserDetail> => {
  const response = await instanceWithToken.get(`v1/user/${userId}`);
  return response.data;
};

const userService = { getDetailUser };

export default userService;
