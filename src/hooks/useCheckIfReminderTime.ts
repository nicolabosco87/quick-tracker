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

let reminderInterval: NodeJS.Timer;

export const useCheckIfReminderTime = () => {
  const { settings } = useSnapshot(state);

  useEffect(() => {
    reminderInterval = setInterval(async () => {
      const prMonitor = await primaryMonitor();
      // const allMonitors = await availableMonitors();
      // const monitor = await currentMonitor();

      if (isReminderTime(settings)) {
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
          x: prMonitor ? prMonitor?.size.width - 300 * prMonitor.scaleFactor : 0,
          y: prMonitor ? prMonitor?.size.height - 400 * prMonitor.scaleFactor : 0,
        });

        popupWindow.once("tauri://created", () => {
          if (prMonitor) {
            const position = new PhysicalPosition(
              prMonitor?.size.width - 300 * prMonitor.scaleFactor,
              prMonitor?.size.height - 400 * prMonitor.scaleFactor
            );
            popupWindow.setPosition(position);
          }
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
