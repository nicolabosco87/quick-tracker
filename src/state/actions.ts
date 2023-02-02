import { v4 as uuidv4 } from "uuid";
import { Frequency, state, TSettings, TTrack } from "./state";

export const addTrack = (track: string, duration: Frequency) => {
  state.trackings.push({
    id: uuidv4(),
    description: track,
    startTime: new Date(),
    archived: false,
    duration,
  });
};

export const archiveTrack = (id: string) => {
  state.trackings = state.trackings.map((t) => {
    if (t.id === id) {
      t.archived = true;
    }

    return t;
  });
};

export const deleteTrack = (id: string) => {
  state.trackings = state.trackings.filter((t) => t.id !== id);
};

export const editTrack = (track: TTrack) => {
  state.trackings = state.trackings.map((t) => (t.id === track.id ? track : t));
};

export const updateSettings = (settings: TSettings) => {
  state.settings = settings;
};
