import { type FC, type ReactNode, useState, useContext } from "react";
import { Text, Group, Paper } from "@mantine/core";
import {
  SigninButton,
  githubProvider,
  googleProvider,
  UserContext,
} from "@/shared";
import { handleLogin, showWidget } from "../model";

interface Props {
  children: ReactNode;
}

export const SigninCard: FC<Props> = ({ children }) => {
  const { setUserData } = useContext(UserContext);
  const [usernameWidget, setUsernameWidget] = useState(false);

  if (usernameWidget) {
    return children;
  }
  return (
    <Paper shadow="md" radius="md" withBorder p="xl" className="w-80">
      <Text ta="center" size="lg" lh="lg" mb="xl">
        Войдите
      </Text>
      <Group justify="center" gap="xs">
        <SigninButton
          typeProvider="google"
          onClick={() => {
            handleLogin(
              googleProvider,
              setUserData,
              showWidget(setUsernameWidget)
            );
          }}
        />
        <SigninButton
          typeProvider="github"
          onClick={() => {
            handleLogin(
              githubProvider,
              setUserData,
              showWidget(setUsernameWidget)
            );
          }}
        />
      </Group>
    </Paper>
  );
};
