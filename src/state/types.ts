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

export enum ActiveDay {
  Sunday = "0",
  Monday = "1",
  Tuesday = "2",
  Wednesday = "3",
  Thursday = "4",
  Friday = "5",
  Saturday = "6",
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
  maxSuggestions: number;
  ranges: Range[];
  popupPosition: PopupPosition;
  activeDays: ActiveDay[];
  temporaryDisabled: boolean;
};
