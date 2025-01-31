import { USER_ROLE } from "../User/user.constant";

export type TRegisterUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  role: keyof typeof USER_ROLE;
  profilePhoto?: string;
};
export type TLoginUser = {
  email: string;
  password: string;
};
