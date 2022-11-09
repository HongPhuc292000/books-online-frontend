import { LoginParams, LoginResponse } from "types/Auth";
import { createService, createServiceNoToken } from "./axios";

const authUrl = process.env.REACT_APP_API_AUTH;
const instance = createServiceNoToken(authUrl);
const instanceWithToken = createService(authUrl);

const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await instance.post(`${authUrl}login`, params);
  return response.data;
};

const logout = async (): Promise<LoginResponse> => {
  const response = await instanceWithToken.post(`${authUrl}logout`);
  return response.data;
};

const authService = { login, logout };

export default authService;
