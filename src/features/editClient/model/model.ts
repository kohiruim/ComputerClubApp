import type { NavigateFunction } from "react-router-dom";
import type { UserData, UserRole, AppDispatch } from "@/shared";
import { modifyUserInDataBase } from "@/entities";

type Values = {
  fullname: string;
  username: string;
  role: UserRole;
  email: string;
  balance: number;
};

type Form = {
  values: Values;
  reset: () => void;
};

export const updateUser = async (
  form: Form,
  navigate: NavigateFunction,
  updateUser: UserData,
  dispatch: AppDispatch
): Promise<void> => {
  await dispatch(
    modifyUserInDataBase({ user: updateUser, actionType: "update" })
  );
  form.reset();
  navigate(-1);
};
