import { MantineProvider } from "@mantine/core";
import { LoginPage } from "@/pages";

function App() {
  return (
    <MantineProvider>
      <LoginPage />
    </MantineProvider>
  );
}

export default App;
