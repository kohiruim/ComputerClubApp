import type { FC, ReactNode } from "react";
import { Text, Group, Paper } from "@mantine/core";
import {
  SigninButton,
  githubProvider,
  googleProvider,
  UserRole,
  Paths,
  type UserData,
  type Provider,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { loginUser } from "../model";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

interface Props {
  children: ReactNode;
}

export const SigninCard: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.userSlice.isAuth);
  const currentUser: UserData = useAppSelector(
    state => state.userSlice.currentUser
  );

  const handleLogin = (provider: Provider) => {
    loginUser(provider, dispatch).catch((error: Error) => {
      notifications.show({ message: error.message, color: "violet" });
    });
  };

  if (isAuth && !currentUser.username) {
    return children;
  }
  if (isAuth && currentUser.role == UserRole.Admin) {
    return <Navigate to={Paths.Admin} />;
  }

  return (
    <Paper shadow="md" radius="md" withBorder p="xl">
      <Text ta="center" size="lg" lh="lg" mb="xl">
        {t("sign in")}
      </Text>
      <Group justify="center" gap="xs">
        <SigninButton
          typeProvider="google"
          onClick={() => {
            handleLogin(googleProvider);
          }}
        />
        <SigninButton
          typeProvider="github"
          onClick={() => {
            handleLogin(githubProvider);
          }}
        />
      </Group>
    </Paper>
  );
};
