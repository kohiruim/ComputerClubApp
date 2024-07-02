import { selectIsAuth } from "@/entities/user/model/selectors";
import { Paths, useAppSelector } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";

export const RequerAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={Paths.Login} replace />;
};
