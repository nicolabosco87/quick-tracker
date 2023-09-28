import { Box, Button, ButtonProps, Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconListDetails, IconPencilPlus, IconSettings } from "@tabler/icons";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsDevice } from "../hooks/mediaHooks";
import { version } from "../../package.json";

const useMenuButtonProps = (path: string): ButtonProps => {
  const location = useLocation();
  const isDevice = useIsDevice();

  return useMemo(
    () => ({
      color: "ocean-blue",
      variant: location.pathname === path ? "filled" : "default",
      fullWidth: true,
      sx: {
        width: isDevice ? 40 : "100%",
        height: 40,
        padding: 0,
        justifyContent: isDevice ? "center" : "flex-start",
        paddingLeft: isDevice ? 0 : 15,
        display: "inline-flex",
      },
    }),
    [isDevice, location.pathname, path]
  );
};

export const Menu = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isDevice = useIsDevice();

  const goToHome = () => navigate("/");
  const goToManualTrack = () => navigate("/manual-track");
  const goToSettings = () => navigate("/settings");

  const homeProps = useMenuButtonProps("/");
  const trackProps = useMenuButtonProps("/manual-track");
  const settingsProps = useMenuButtonProps("/settings");

  console.log(theme.colors.gray[9]);

  return (
    <Stack align="left" sx={{ height: "100%", paddingTop: 30 }}>
      <Stack align="center" justify="start" sx={{ flex: 1 }}>
        <Button {...homeProps} onClick={goToHome} title="Track History" mt={10}>
          <IconListDetails />
          {!isDevice ? <Box ml={10}>Track History</Box> : null}
        </Button>
        <Button {...trackProps} onClick={goToManualTrack} title="Add Track">
          <IconPencilPlus />
          {!isDevice ? <Box ml={10}>Add Track</Box> : null}
        </Button>
        <Button {...settingsProps} onClick={goToSettings} title="Settings">
          <IconSettings />
          {!isDevice ? <Box ml={10}>Settings</Box> : null}
        </Button>
      </Stack>

      {!isDevice && (
        <Box fz="xs" sx={{ color: theme.colors.gray[7] }}>
          Quick Tracker v{version}
        </Box>
      )}
    </Stack>
  );
};
