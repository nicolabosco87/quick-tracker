export type Frequency = 1 | 15 | 30 | 60;

export type Range = {
  start: string;
  end: string;
};

export type Track = {
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

export type State = {
  trackings: Track[];
  settings: Settings;
  windowSizePosition: WindowSizePosition;
};

export type Settings = {
  frequency: Frequency;
  ranges: Range[];
};
