import { Navigate, Outlet } from "react-router-dom";
import { UserRole, Paths } from "@/shared/type";
import { useAppSelector } from "@/shared/lib";
import { selectIsAuth, selectRole } from "@/entities/user";

export const RequerAdmin = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const role = useAppSelector(selectRole);

  if (isAuth && role === UserRole.Admin) {
    return <Outlet />;
  }

  return <Navigate to={Paths.Login} replace />;
};
