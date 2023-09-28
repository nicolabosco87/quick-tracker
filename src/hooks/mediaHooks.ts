import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useIsDevice = () => {
  const theme = useMantineTheme();
  return useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
};
