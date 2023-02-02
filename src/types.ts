export type WindowEnhanced = Window &
  typeof globalThis & {
    electronAPI: {
      onTrackPopup: (callback: any) => void;
      onShowHistory: (callback: any) => void;
      minimize: () => void;
    };
  };
