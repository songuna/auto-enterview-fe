import { IUser, IUserAuth } from "../../type/user";
import { http } from "../instances";

export const postSignin = (userData: IUserAuth) => {
  return http.post<IUser>(`common/signin`, userData);
};

export const postSignup = (userData: IUserAuth) => {
  return http.post<IUser>(`candidates/signup`, userData);
};
