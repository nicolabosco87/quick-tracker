import { SelectItem } from "@mantine/core";
import { useMemo } from "react";

export const useFrequenciesOptions = (): SelectItem[] => {
  return useMemo(() => {
    const items = ["15", "30", "60"];

    if (!import.meta.env.PROD) {
      items.unshift("1");
    }

    return items.map((i) => ({
      value: i,
      label: i,
    }));
  }, []);
};
