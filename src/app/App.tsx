import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { LoginPage } from "@/pages";
import { UserProvider } from "@/shared";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <MantineProvider>
      <UserProvider>
        <LoginPage />
        <Notifications />
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
