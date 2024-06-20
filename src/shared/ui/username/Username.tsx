import type { FC } from "react";
import { Avatar, Group, Text, Flex } from "@mantine/core";
import type { Sizes } from "@/shared/type";
import { stylesMapper } from "@/shared/lib";

type User = {
  username?: string;
  fullname?: string;
  photo: string;
};
interface Props {
  user: User;
  size: Sizes;
}

export const Username: FC<Props> = ({ user, size }) => {
  const { sizeUsernameText, sizeFullnameText, colorText, width } =
    stylesMapper[size];

  return (
    <Group>
      <Avatar
        variant="filled"
        radius="xl"
        color="indigo"
        size="md"
        src={user.photo}
      />
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        {user.username && (
          <Text size={sizeUsernameText} fw={500} lineClamp={1}>
            {user.username}
          </Text>
        )}
        {user.fullname && (
          <Text maw={width} size={sizeFullnameText} lineClamp={1} c={colorText}>
            {user.fullname}
          </Text>
        )}
      </Flex>
    </Group>
  );
};
