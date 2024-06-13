import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, NativeSelect, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { addClient } from "../model";
import { UserRole } from "@/shared/type";
import {
  useAppDispatch,
  useAppSelector,
  usernameValidation,
  emailValidation,
} from "@/shared/lib";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { selectLoading } from "@/entities/user";

interface Values {
  fullname: string;
  username: string;
  email: string;
  role: UserRole;
}

export const AddClientButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const { t } = useTranslation();

  const shema = z.object({
    username: usernameValidation(t),
    email: emailValidation(t),
  });

  const handleAddClient = (values: Values) => {
    addClient(values, dispatch, close);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      role: UserRole.User,
    },
    validate: zodResolver(shema),
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title={t("add client")} centered>
        <form
          onSubmit={form.onSubmit(values => {
            handleAddClient(values);
          })}
        >
          <TextInput
            label={t("fullname")}
            placeholder={t("your fullname")}
            key={form.key("fullname")}
            mb={20}
            {...form.getInputProps("fullname")}
          />
          <TextInput
            withAsterisk
            label={t("username")}
            placeholder="username"
            key={form.key("username")}
            mb={20}
            {...form.getInputProps("username")}
          />
          <NativeSelect
            size="sm"
            label={t("role")}
            data={[UserRole.User, UserRole.Admin]}
            key={form.key("role")}
            mb={20}
            {...form.getInputProps("role")}
          />
          <TextInput
            withAsterisk
            label={t("email")}
            placeholder="example@gmail.com"
            key={form.key("email")}
            mb={30}
            {...form.getInputProps("email")}
          />
          <Flex justify="flex-end">
            <Button type="submit" loading={isLoading}>
              {t("add client")}
            </Button>
          </Flex>
        </form>
      </Modal>

      <Button onClick={open}>{t("add client")}</Button>
    </>
  );
};
