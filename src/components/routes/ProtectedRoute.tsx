// import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  /*  [todo] : user 인증 연동하면 구현하기 */
  // const user = ;
  // if (user === null) {
  //   return <Navigate to="/login" />;
  // }
  return children;
}
