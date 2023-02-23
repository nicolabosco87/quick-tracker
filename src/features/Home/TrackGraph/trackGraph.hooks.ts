import { useMantineTheme } from "@mantine/core";
import { useCallback, useMemo } from "react";

export const useGetGraphColor = () => {
  const { colors } = useMantineTheme();

  const graphColors = useMemo(() => {
    return [
      colors["ocean-blue"][5],
      colors.orange[5],
      colors["light-green"][5],
      colors.red[5],
      colors.yellow[5],
      colors.pink[5],
      colors.indigo[5],
      colors.violet[5],
      colors.cyan[5],
      colors.blue[5],
    ];
  }, [colors]);

  return useCallback(
    (index: number) => {
      const lastIndex = String(index);

      return graphColors[Number(lastIndex[lastIndex.length - 1])];
    },
    [graphColors]
  );
};
