import { proxy, subscribe } from "valtio";
import { DEFAULT_FREQUENCY } from "../consts";
import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';

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
export type TState = {
  trackings: TTrack[];
  settings: TSettings;
};

export type TSettings = {
  frequency: Frequency;
  ranges: TRange[];
};

export const initialState: TState = {
  trackings: [],
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
    // Neutralino.filesystem.writeFile("./qts.json", JSON.stringify(state));
    await writeTextFile('qts.json', 'file contents', { dir: BaseDirectory.AppConfig });
  }
});

declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
}

export const loadFromDisk = async () => {
  try {
    // const rawData = false; await Neutralino.filesystem.readFile("./qts.json");
    // const data = JSON.parse(rawData);
    const rawData = await readTextFile('qts.json', { dir: BaseDirectory.AppConfig });
    const data = JSON.parse(rawData);

    state.settings = data.settings ?? initialState.settings;
    state.trackings = data.trackings ?? initialState.trackings;
    loadedFromDisk = true;
  } catch (error) {
    console.error("Error while loading disk data", error);
    loadedFromDisk = true;
  }
};