import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authUserState } from "../recoil/store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authUser = useRecoilValue(authUserState);
  if (authUser === null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/login" />;
  }
  return children;
}
