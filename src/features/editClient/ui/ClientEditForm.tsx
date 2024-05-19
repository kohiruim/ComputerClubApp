import type { FC } from "react";
import {
  Button,
  TextInput,
  NativeSelect,
  Group,
  NumberInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  type UserData,
  UserRole,
  useAppDispatch,
  useAppSelector,
  usernameValidation,
  emailValidation,
} from "@/shared";
import { Coins } from "@/shared/assets";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { CgLogOut } from "react-icons/cg";
import { zodResolver } from "mantine-form-zod-resolver";
import { updateUser } from "../model";
import { z } from "zod";

type Props = {
  user: UserData;
};

type FormValues = {
  fullname: string;
  username: string;
  role: UserRole;
  email: string;
  balance: number;
};

export const ClientEditForm: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.userSlice.isLoading);
  const { t } = useTranslation();

  const shema = z.object({
    username: usernameValidation(t),
    email: emailValidation(t),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      email: user.email,
      balance: user.balance,
    },
    validate: zodResolver(shema),
  });

  const handleSubmitForm = (values: FormValues) => {
    const emendUser: UserData = {
      ...user,
      ...values,
    };
    updateUser(form, navigate, emendUser, dispatch);
  };

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmitForm(values);
      })}
    >
      <TextInput
        label={t("fullname")}
        key={form.key("fullname")}
        mb={20}
        {...form.getInputProps("fullname")}
      />
      <TextInput
        label={t("username")}
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
        label={t("email")}
        key={form.key("email")}
        placeholder="example@gmail.com"
        mb={20}
        {...form.getInputProps("email")}
      />
      <NumberInput
        leftSection={<Coins color="default" />}
        label={t("balance")}
        key={form.key("balance")}
        mb={40}
        min={0}
        {...form.getInputProps("balance")}
      />
      <Group justify="center">
        <Button
          color="indigo"
          leftSection={<CgLogOut size={20} />}
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("back to clients")}
        </Button>
        <Button type="submit" color="indigo" loading={isLoading}>
          {t("save")}
        </Button>
      </Group>
    </form>
  );
};
