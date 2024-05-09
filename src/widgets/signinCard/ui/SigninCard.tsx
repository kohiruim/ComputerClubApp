import { Text, Group, Paper } from "@mantine/core";
import { SigninButton, githubProvider, googleProvider } from "@/shared";
import { handleLogin } from "../model";

export const SigninCard = () => {
  return (
    <Paper shadow="md" radius="md" withBorder p="xl" className="w-80">
      <Text ta="center" size="lg" lh="lg" mb="xl">
        Войдите
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
