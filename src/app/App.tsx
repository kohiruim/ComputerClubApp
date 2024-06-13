import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { theme } from "@/app/theme/theme";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Notifications />
      </Provider>
    </MantineProvider>
  );
}

export default App;
