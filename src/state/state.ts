import { proxy, subscribe } from "valtio";
import { DEFAULT_FREQUENCY } from "../consts";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

export const STATE_STORAGE_KEY = "tracker";

export type Frequency = 1 | 15 | 30 | 60;

export type TRange = {
  start: string;
  end: string;
};

export type TTrack = {
  id: string;
  startTime: Date;
  description: string;
  duration: Frequency;
  archived: boolean;
};

export type WindowSizePosition = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type TState = {
  trackings: TTrack[];
  settings: TSettings;
  windowSizePosition: WindowSizePosition;
};

export type TSettings = {
  frequency: Frequency;
  ranges: TRange[];
};

export const initialState: TState = {
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
export const state = proxy<TState>(initialState);

subscribe(state, async () => {
  if (loadedFromDisk) {
    console.log("Writing", BaseDirectory.Home);
    await writeTextFile("qts.json", JSON.stringify(state), { dir: BaseDirectory.Home });
  }
});

declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
}

export const loadFromDisk = async () => {
  try {
    console.log("Loading", BaseDirectory.Home);
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
