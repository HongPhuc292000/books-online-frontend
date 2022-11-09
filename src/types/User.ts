import { UserRole } from "./enums";

export interface UserDetail {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
  fullname: string;
  email: string;
  createAt: string;
  modifiedAt: string;
}
