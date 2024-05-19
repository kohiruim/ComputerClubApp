import { notifications } from "@mantine/notifications";
import type { UserData, UserRole, AppDispatch } from "@/shared";
import { v4 as uuidv4 } from "uuid";
import { modifyUserInDataBase, makeClientsQuery } from "@/entities";

interface Values {
  fullname: string;
  username: string;
  email: string;
  role: UserRole;
}

export const addClient = async (
  values: Values,
  dispatch: AppDispatch,
  closeWindow: () => void
): Promise<void> => {
  try {
    const user: UserData = {
      ...values,
      photo: "",
      balance: 0,
      id: uuidv4(),
    };
    await dispatch(modifyUserInDataBase({ user: user, actionType: "add" }));
    await dispatch(makeClientsQuery({ item: "username", direction: "asc" }));
    closeWindow();
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({ message: error.message, color: "violet" });
    } else {
      console.error(error);
    }
  }
};
