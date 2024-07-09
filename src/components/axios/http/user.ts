import { IUser, IUserAuth } from "../../type/user";
import { http } from "../instances";

export const postSignin = (userData: IUserAuth) => {
  return http.post<IUser>(` /common/signin`);
};
