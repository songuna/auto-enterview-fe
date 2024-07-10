import { IUser, IUserAuth } from "../../type/user";
import { http } from "../instances";

export const postSignin = (userData: IUserAuth) => {
  return http.post<IUser>(` /common/signin`, userData);
};

export const postSignup = (userData: IUserAuth) => {
  return http.post<IUser>(`/candidates/signup`, userData);
};

export const checkEmailDuplication = (email: string) => {
  return http.post<void>('/common/duplicate-email', { email });
};

export const postSendVerificationCode = (email: string) => {
  return http.post<void>('/common/send-verification-code', { email });
};

