import { Center } from "@mantine/core";
import { SigninCard, CreateUsername } from "@/widgets";

export const LoginPage = () => {
  return (
    <Center mih={"100vh"} m={10}>
      <SigninCard>
        <CreateUsername />
      </SigninCard>
    </Center>
  );
};
