import type { UserData, AppDispatch } from "@/shared/type";
import { modifyUserInDataBase, setCurrentUsername } from "@/entities/user";

export const addCurrentUsername = async (
  username: string,
  user: UserData,
  dispatch: AppDispatch
): Promise<void> => {
  const newUser = {
    ...user,
    username: username,
  };
  await dispatch(modifyUserInDataBase({ user: newUser, actionType: "add" }));
  dispatch(setCurrentUsername(username));
};
