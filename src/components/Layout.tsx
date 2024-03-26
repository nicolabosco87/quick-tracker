import styled from "@emotion/styled";
import { Alert, AppShell, Box, Navbar } from "@mantine/core";
import { appWindow } from "@tauri-apps/api/window";
import { ReactNode, useLayoutEffect, useState } from "react";
import { useIsDevice } from "../hooks/mediaHooks";
import { Menu } from "./Menu";
import { useSnapshot } from "valtio";
import { state } from "../state/state";

type TLayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: TLayoutProps) => {
  const isDevice = useIsDevice();

  const {
    settings: { temporaryDisabled },
  } = useSnapshot(state);
  const TitleBar = styled.div`
    height: 30px;
    background: ${(theme) => `${theme.theme.colors["ocean-blue"][5]};`}
    user-select: none;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .titlebar__appTitle {
      font-weight: 500;
      color: white;
      padding-left: 10px;
      line-height: 30px;
      font-size: 14px;
    }

    .titlebar__button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
    }
    .titlebar__button:hover {
      background: ${(theme) => `${theme.theme.colors["ocean-blue"][4]};`}
    }
  `;

  return (
    <>
      <TitleBar data-tauri-drag-region>
        <div className="titlebar__appTitle">Quick Tracker</div>
        <div>
          <div className="titlebar__button" id="titlebar-maximize" onClick={() => appWindow.toggleMaximize()}>
            <img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
          </div>
          <div className="titlebar__button" id="titlebar-close" onClick={() => appWindow.hide()}>
            <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
          </div>
        </div>
      </TitleBar>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            width={{ base: isDevice ? 70 : 230 }}
            sx={(theme) => ({
              background: theme.fn.linearGradient(35, theme.colors["gray"][3], theme.colors["gray"][0]),
              transition: "width 0.2s",
            })}
            p="xs"
          >
            <Navbar.Section grow>
              <Menu />
            </Navbar.Section>
          </Navbar>
        }
      >
        <Box pt={30}>
          {temporaryDisabled ? (
            <Alert mb={20} color="red">
              Quick Tracker currently disabled!
            </Alert>
          ) : null}

          {children}
        </Box>
      </AppShell>
    </>
  );
};
