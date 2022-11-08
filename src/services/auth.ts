import { AuthParams, LoginResponse } from "types/Auth";
import { createServiceNoToken } from "./axios";

const authUrl = process.env.REACT_APP_API_AUTH;
const instance = createServiceNoToken(authUrl);

const login = async (params: AuthParams): Promise<LoginResponse> => {
  const response = await instance.post(`${authUrl}login`, params);
  return response.data;
};
const authService = { login };

export default authService;
