import { Center } from "@mantine/core";
import { SigninCard, CreateUsername } from "@/widgets";

export const LoginPage = () => (
  <Center style={{ minHeight: "calc(100vh - 90px)" }} m={10}>
    <SigninCard>
      <CreateUsername />
    </SigninCard>
  </Center>
);
