import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { useCallback, useEffect } from "react";
import { addTrack } from "../state/actions";
import { Frequency } from "../state/types";

let listener: UnlistenFn | undefined = undefined;

export type EventAddTrackPlayload = {
  track: string;
  frequency: Frequency;
};

export const useSetListenerForNewTrackEvent = () => {
  return useCallback(async () => {
    if (listener) {
      return;
    }

    listener = await listen<EventAddTrackPlayload>("addTrack", (event) => {
      addTrack(event.payload.track, event.payload.frequency);
    });
  }, []);
};
