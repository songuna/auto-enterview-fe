import { atom } from "recoil";
import { IUser } from "../../type/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authUserState = atom<IUser | null>({
  key: "authUserState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
