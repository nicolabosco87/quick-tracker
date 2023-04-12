import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { theme } from "./theme";
import { PaddedContent } from "./components/PaddedContent";
import { Track } from "./features/Track";
import { useStateSync } from "./hooks/useStateSync";

type AppProps = {
  isPopup?: boolean;
};

function App({ isPopup }: AppProps) {
  const isLoaded = useStateSync();

  return (
    <MantineProvider inherit theme={theme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider>
          <LoadingOverlay visible={!isLoaded} />
          {isLoaded ? (
            <>
              {isPopup ? (
                <PaddedContent>
                  <Track />
                </PaddedContent>
              ) : (
                <HashRouter>
                  <Router />
                </HashRouter>
              )}
            </>
          ) : null}
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
