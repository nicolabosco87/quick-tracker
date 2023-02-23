import { Button, ButtonProps, Stack } from "@mantine/core";
import { IconListDetails, IconPencilPlus, IconSettings } from "@tabler/icons";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useMenuButtonProps = (path: string): ButtonProps => {
  const location = useLocation();

  return useMemo(
    () => ({
      color: "green",
      variant: location.pathname === path ? "filled" : "white",
      sx: { width: 40, height: 40, padding: 0 },
    }),
    [location.pathname, path]
  );
};

export const Menu = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const goToManualTrack = () => navigate("/manual-track");
  const goToSettings = () => navigate("/settings");

  const homeProps = useMenuButtonProps("/");
  const trackProps = useMenuButtonProps("/manual-track");
  const settingsProps = useMenuButtonProps("/settings");

  return (
    <Stack align="center" justify="start">
      <Button {...homeProps} onClick={goToHome} title="Track History" mt={10}>
        <IconListDetails />
      </Button>
      <Button {...trackProps} onClick={goToManualTrack} title="Add Track">
        <IconPencilPlus />
      </Button>
      <Button {...settingsProps} onClick={goToSettings} title="Settings">
        <IconSettings />
      </Button>
    </Stack>
  );
};
