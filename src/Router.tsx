import { currentMonitor, getAll, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { PaddedContent } from "./components/PaddedContent";
import { Layout } from "./components/Layout";
import { Home } from "./features/Home/Home";
import { ManualTrack } from "./features/ManualTrack";
import { Settings } from "./features/Settings";
import { Track } from "./features/Track";
import { useStateSync } from "./hooks/useStateSync";
import { isReminderTime } from "./lib/utils";
import { setWindowSizePosition } from "./state/actions";
import { state } from "./state/state";

let reminderInterval: NodeJS.Timer;

export const Router = () => {
  const navigate = useNavigate();
  const { settings } = useSnapshot(state);
  useStateSync();

  useEffect(() => {
    reminderInterval = setInterval(async () => {
      if (isReminderTime(settings)) {
        const windows = getAll();
        if (windows.length > 0) {
          const mainWindow = windows[0];

          const currentSize = await mainWindow.outerSize();
          const currentPosition = await mainWindow.outerPosition();

          setWindowSizePosition({
            height: currentSize.height,
            width: currentSize.height,
            x: currentPosition.x,
            y: currentPosition.y,
          });

          const size = new PhysicalSize(400, 500);
          mainWindow.setSize(size);

          const monitor = await currentMonitor();

          if (monitor) {
            const position = new PhysicalPosition(monitor?.size.width - 400, monitor?.size.height - 500);
            mainWindow.setPosition(position);
          }

          navigate("track-popup");

          mainWindow.setAlwaysOnTop(true);
          mainWindow.show();
        }
      }
    }, 60000);

    return () => {
      if (reminderInterval) {
        clearInterval(reminderInterval);
      }
    };
  }, [settings]);

  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Home />} />
        <Route path="manual-track" element={<ManualTrack />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route
        path="track-popup"
        element={
          <PaddedContent>
            <Track />
          </PaddedContent>
        }
      />
    </Routes>
  );
};
