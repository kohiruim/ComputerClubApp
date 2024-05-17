import { Paper, Text } from "@mantine/core";
import { UsernameForm } from "@/features";

export const CreateUsername = () => (
  <Paper shadow="md" radius="md" withBorder p="xl" className="w-80">
    <Text ta="center" size="lg" lh="lg" mb="xl">
      Придумай никнейм
    </Text>
    <UsernameForm />
  </Paper>
);
