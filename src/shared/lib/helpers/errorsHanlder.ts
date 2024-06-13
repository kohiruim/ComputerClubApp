import { notifications } from "@mantine/notifications";
import type { PayloadAction } from "@reduxjs/toolkit";

type errorState = {
  isLoading: boolean;
  error: string;
};

export const errorsHanlder = (
  state: errorState,
  action?: PayloadAction<unknown>
) => {
  if (typeof action?.payload == "string") {
    state.error = action?.payload;
  } else {
    state.error = "unknown error";
  }
  state.isLoading = false;
  notifications.show({ message: state.error });
};
