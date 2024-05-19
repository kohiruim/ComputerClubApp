import { Navigate, Outlet } from "react-router-dom";
import { UserRole, Paths, useAppSelector } from "@/shared";

export const RequerAdmin = () => {
  const isAuth = useAppSelector(state => state.userSlice.isAuth);
  const role = useAppSelector(state => state.userSlice.currentUser.role);

  if (isAuth && role === UserRole.Admin) {
    return <Outlet />;
  }

  return <Navigate to={Paths.Login} replace />;
};
