import dayjs from "dayjs";
import { useMemo } from "react";
import { Frequency } from "../state/state";

export const useGetSliderMarks = (frequency: Frequency) => {
  return useMemo(() => {
    const marks: {
      value: number;
      label?: React.ReactNode;
    }[] = [];

    const startDate = dayjs("2000-01-01 00:00:00");
    let date = dayjs("2000-01-01 00:00:00");

    let i = 0;
    while (date.format("DD") === "01" && i < 100) {
      i++;
      marks.push({
        value: (date.diff(startDate) / 1000 / 60 / 60 / 24) * 100,
        label: date.format("HH:mm"),
      });
      date = date.add(frequency, "minutes");
    }

    return marks;
  }, []);
};
