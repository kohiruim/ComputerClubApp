import { Center } from "@mantine/core";
import { SigninCard } from "@/widgets/signinCard";
import { CreateUsername } from "@/widgets/createUsername";

export const LoginPage = () => (
  <Center style={{ minHeight: "calc(100vh - 90px)" }} m={10}>
    <SigninCard>
      <CreateUsername />
    </SigninCard>
  </Center>
);
