import { notifications } from "@mantine/notifications";

export const showErrorMessage = (err: string) => {
  notifications.show({ message: err, color: "violet" });
  return err;
};
