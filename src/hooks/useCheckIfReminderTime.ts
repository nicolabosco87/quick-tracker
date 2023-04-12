import {
  LogicalPosition,
  PhysicalPosition,
  WebviewWindow,
  availableMonitors,
  currentMonitor,
  primaryMonitor,
} from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { isReminderTime } from "../lib/utils";
import { state } from "../state/state";
import { useGetPopupPosition } from "./useGetPopupPosition";

let reminderInterval: NodeJS.Timer;

export const useCheckIfReminderTime = () => {
  const { settings } = useSnapshot(state);
  const getPopupPosition = useGetPopupPosition();

  useEffect(() => {
    reminderInterval = setInterval(async () => {
      // const prMonitor = await primaryMonitor();
      // const allMonitors = await availableMonitors();
      // const monitor = await currentMonitor();

      if (isReminderTime(settings)) {
        const popupPosition = await getPopupPosition();

        const popupWindow = new WebviewWindow("popup", {
          url: "index-popup.html",
          alwaysOnTop: true,
          height: 400,
          width: 300,
          focus: false,
          title: "Track",
          hiddenTitle: true,
          decorations: false,
          skipTaskbar: false,
          x: popupPosition.x,
          y: popupPosition.y,
        });

        popupWindow.once("tauri://created", () => {
          const position = new PhysicalPosition(popupPosition.x, popupPosition.y);
          popupWindow.setPosition(position);
        });
      }
    }, 60000);

    return () => {
      if (reminderInterval) {
        clearInterval(reminderInterval);
      }
    };
  }, [settings]);
};
