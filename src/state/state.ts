import { proxy, subscribe } from "valtio";
import { DEFAULT_FREQUENCY } from "../consts";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { State } from "./types";

export const STATE_STORAGE_KEY = "tracker";

export const initialState: State = {
  trackings: [],
  windowSizePosition: {
    width: 800,
    height: 600,
    x: 200,
    y: 200,
  },
  settings: {
    frequency: DEFAULT_FREQUENCY,
    ranges: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
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

    state.settings = data.settings ?? initialState.settings;
    state.trackings = data.trackings ?? initialState.trackings;
    loadedFromDisk = true;
  } catch (error) {
    console.error("Error while loading disk data", error);
    loadedFromDisk = true;
  }
};
