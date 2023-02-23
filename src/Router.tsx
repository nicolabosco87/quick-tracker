import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PaddedContent } from "./components/PaddedContent";
import { Home } from "./features/Home/Home";
import { ManualTrack } from "./features/ManualTrack";
import { Settings } from "./features/Settings";
import { Track } from "./features/Track";
import { useCheckIfReminderTime } from "./hooks/useCheckIfReminderTime";
import { useStateSync } from "./hooks/useStateSync";

export const Router = () => {
  useStateSync();
  useCheckIfReminderTime();

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
