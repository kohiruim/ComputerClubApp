import { Paths, useAppSelector } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";

export const RequerAuth = () => {
  const isAuth = useAppSelector(state => state.userSlice.isAuth);

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={Paths.Login} replace />;
};
