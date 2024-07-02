import type { FC, ReactNode } from "react";

import { Center, Loader } from "@mantine/core";

type Props = { isFetching: boolean; children: ReactNode };

export const LoaderContainer: FC<Props> = ({ isFetching, children }) => {
  if (isFetching) {
    return (
      <Center h={"100%"} w={"100%"}>
        <Loader size="xl" variant="bars" />
      </Center>
    );
  }

  return children;
};
