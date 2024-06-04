import type { FC, ComponentPropsWithoutRef } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Button } from "@mantine/core";
import type { Direction } from "@/shared";

type DefaultProps = ComponentPropsWithoutRef<"button">;
type Props = Omit<DefaultProps, "className"> & {
  direction?: Direction;
};

export const ButtonSort: FC<Props> = ({ direction, ...otherProps }) => {
  const icon =
    direction === "desc" ? <TiArrowSortedDown /> : <TiArrowSortedUp />;
  return (
    <Button
      variant="outline"
      color="gray"
      radius="xs"
      p={0}
      h={15}
      ml={5}
      {...otherProps}
    >
      {icon}
    </Button>
  );
};
