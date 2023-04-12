import { primaryMonitor } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { state } from "../state/state";
import { PopupPosition } from "../state/types";

export const useGetPopupPosition = () => {
  const { settings } = useSnapshot(state);

  return useCallback(async () => {
    const prMonitor = await primaryMonitor();

    let x = 0,
      y = 0;

    if (!prMonitor)
      return {
        x,
        y,
      };

    if (
      [PopupPosition.MiddleLeft, PopupPosition.MiddleCenter, PopupPosition.MiddleRight].includes(settings.popupPosition)
    ) {
      y = prMonitor?.size.height / 2 - (400 * prMonitor.scaleFactor) / 2;
    }

    if (
      [PopupPosition.BottomLeft, PopupPosition.BottomCenter, PopupPosition.BottomRight].includes(settings.popupPosition)
    ) {
      y = prMonitor?.size.height - 400 * prMonitor.scaleFactor;
    }

    if (
      [PopupPosition.TopCenter, PopupPosition.MiddleCenter, PopupPosition.BottomCenter].includes(settings.popupPosition)
    ) {
      x = prMonitor?.size.width / 2 - (300 * prMonitor.scaleFactor) / 2;
    }

    if (
      [PopupPosition.TopRight, PopupPosition.MiddleRight, PopupPosition.BottomRight].includes(settings.popupPosition)
    ) {
      x = prMonitor?.size.width - 300 * prMonitor.scaleFactor;
    }

    return {
      x,
      y,
    };
  }, [settings.popupPosition]);
};
