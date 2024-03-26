import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { proxy, subscribe } from "valtio";
import { version } from "../../package.json";
import { DEFAULT_FREQUENCY, DEFAULT_POPUP_POSITION } from "../consts";
import { ActiveDay, State } from "./types";

export const STATE_STORAGE_KEY = "tracker";

export const initialState: State = {
  version,
  trackings: [],
  settings: {
    frequency: DEFAULT_FREQUENCY,
    ranges: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    popupPosition: DEFAULT_POPUP_POSITION,
    activeDays: [ActiveDay.Monday, ActiveDay.Tuesday, ActiveDay.Wednesday, ActiveDay.Thursday, ActiveDay.Friday],
    temporaryDisabled: false,
  },
};

let loadedFromDisk = false;
export const state = proxy<State>(initialState);

subscribe(state, async () => {
  if (loadedFromDisk) {
    await writeTextFile("qts.json", JSON.stringify(state), { dir: BaseDirectory.Home });
  }
});

declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
}

export const loadFromDisk = async () => {
  try {
    const rawData = await readTextFile("qts.json", { dir: BaseDirectory.Home });
    const data = JSON.parse(rawData);

    state.settings = { ...initialState.settings, ...data.settings } ?? initialState.settings;
    state.trackings = data.trackings ?? initialState.trackings;
    state.version = version; // Set last version
    loadedFromDisk = true;
  } catch (error) {
    console.error("Error while loading disk data", error);
    loadedFromDisk = true;
  }
};
