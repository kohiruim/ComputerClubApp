import { LoadingOverlay, createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "indigo",
  components: {
    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        loaderProps: { type: "bars", size: "sm" },
      },
    }),
  },
});
