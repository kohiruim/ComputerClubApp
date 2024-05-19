import type { FC } from "react";
import { Flex, Text } from "@mantine/core";
import { Coins } from "@/shared/assets";

interface Props {
  balance: number;
}

export const Balance: FC<Props> = ({ balance }) => (
  <Flex align="center" gap={5}>
    <Coins color="yellow" />
    <Text c="yellow">{balance}</Text>
  </Flex>
);
