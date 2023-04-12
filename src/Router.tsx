import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./features/Home/Home";
import { ManualTrack } from "./features/ManualTrack";
import { Settings } from "./features/Settings";
import { useCheckIfReminderTime } from "./hooks/useCheckIfReminderTime";
import { useListenForNewTrackEvent } from "./hooks/useListenForNewTrackEvent";

export const Router = () => {
  useCheckIfReminderTime();
  useListenForNewTrackEvent();

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
    </Routes>
  );
};
