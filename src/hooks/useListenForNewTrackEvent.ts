import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { addTrack } from "../state/actions";
import { Frequency } from "../state/types";

let listener: UnlistenFn;

export type EventAddTrackPlayload = {
  track: string;
  frequency: Frequency;
};

export const useListenForNewTrackEvent = () => {
  useEffect(() => {
    const addListener = async () => {
      if (listener) {
        listener();
      }

      console.log("Add listener");
      listener = await listen<EventAddTrackPlayload>("addTrack", (event) => {
        addTrack(event.payload.track, event.payload.frequency);
      });
    };

    addListener();

    return () => {
      if (listener) {
        listener();
      }
    };
  }, []);
};
