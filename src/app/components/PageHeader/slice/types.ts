import { SignModalStatus } from "types";
import { UserDetail } from "types/User";

/* --- STATE --- */
export interface AuthState {
  authToken?: string;
  user?: UserDetail;
  signModalStatus: SignModalStatus;
}
