export interface UserDetail {
  _id: string;
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
}

export interface AddEditCustomerRequest {
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  gender?: string;
  birthday: string;
}
