import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  type UserData,
  type AppDispatch,
  useAppDispatch,
  useAppSelector,
  usernameValidation,
} from "@/shared";
import { z } from "zod";
import { addCurrentUsername } from "../model";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslation } from "react-i18next";

export const UsernameForm = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useAppDispatch();
  const currentUser: UserData = useAppSelector(
    state => state.userSlice.currentUser
  );

  const schema = z.object({
    username: usernameValidation(t),
  });

  const form = useForm({
    initialValues: { username: "" },
    validate: zodResolver(schema),
  });

  const handleSubmitUsername = (username: string) => {
    addCurrentUsername(username, currentUser, dispatch);
  };

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmitUsername(values.username);
      })}
    >
      <TextInput
        placeholder="Username"
        {...form.getInputProps("username")}
        style={{ width: "420px" }}
      />
      <Button type="submit" mt="sm" color="violet" fullWidth>
        {t("save")}
      </Button>
    </form>
  );
};
