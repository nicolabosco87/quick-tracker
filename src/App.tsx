import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider inherit theme={theme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider>
          <HashRouter>
            <Router />
          </HashRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
