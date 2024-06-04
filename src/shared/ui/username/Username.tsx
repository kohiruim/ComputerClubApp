import type { FC } from "react";
import { Avatar, Group, Text } from "@mantine/core";

interface Props {
  username: string;
  photoUrl: string;
}

export const Username: FC<Props> = ({ username, photoUrl }) => (
  <Group>
    <Avatar
      variant="filled"
      radius="xl"
      color="indigo"
      size="md"
      src={photoUrl}
    />
    <Text>{username}</Text>
  </Group>
);
