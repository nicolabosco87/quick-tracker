import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { state } from "../state/state";

export const useGetUniqueTrackDescriptions = (): string[] => {
  const { trackings } = useSnapshot(state);

  return useMemo(
    () =>
      [...trackings].reverse().reduce((prev: string[], t) => {
        if (prev.indexOf(t.description) < 0) {
          prev.push(t.description);
        }
        return prev;
      }, []),
    []
  );
};
