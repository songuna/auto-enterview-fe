import { atom } from "recoil";
import { IUser } from "../../components/type/user";

export const authUserState = atom<IUser | null>({
  key: "authUserState",
  default: null,
});
