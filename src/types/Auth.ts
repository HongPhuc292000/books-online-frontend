export interface AuthParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: {
    _id: string;
    username: string;
    role: string;
    fullname: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
