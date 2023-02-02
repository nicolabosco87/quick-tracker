import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import React from "react";
import { TrackForm } from "./TrackForm/TrackForm";

export const ManualTrack = () => {
  const showTrackingAddedNotification = () => {
    showNotification({
      autoClose: 5000,
      message: "Tracking added",
      icon: <IconCheck />,
    });
  };

  return <TrackForm afterTrack={showTrackingAddedNotification} />;
};
