import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);
  instance.interceptors.request.use((cf) => {
    return cf;
  });
  instance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

const baseConfig = (
  baseURL?: string,
  contentType: string = "application/json"
) => {
  return {
    baseURL,
    headers: {
      // 'Accept-Language': 'vi',
      "Content-Type": contentType,
    },
  };
};

export const createService = (
  baseURL?: string,
  contentType: string = "application/json"
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

// Service with no token
export const createServiceNoToken = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    return config;
  });
  return instance;
};
