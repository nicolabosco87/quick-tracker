export type Frequency = 1 | 15 | 30 | 60;

export enum PopupPosition {
  TopLeft = "TopLeft",
  TopCenter = "TopCenter",
  TopRight = "TopRight",
  MiddleLeft = "MiddleLeft",
  MiddleCenter = "MiddleCenter",
  MiddleRight = "MiddleRight",
  BottomLeft = "BottomLeft",
  BottomCenter = "BottomCenter",
  BottomRight = "BottomRight",
}

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

export type State = {
  version: string;
  trackings: Track[];
  settings: Settings;
};

export type Settings = {
  frequency: Frequency;
  ranges: Range[];
  popupPosition: PopupPosition;
};
