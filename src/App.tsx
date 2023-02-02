import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { HashRouter } from "react-router-dom";
import { theme } from "./theme";
import { Router } from "./Router";
import { Layout } from "./components/Layout";
import { Home } from "./features/Home/Home";
import { Icon24Hours } from "@tabler/icons";

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
