import { Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { getAll, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { useGetUniqueTrackDescriptions } from "../hooks/useGetUniqueTrackDescriptions";

import { minimizeWindow } from "../lib/utils";
import { addTrack } from "../state/actions";
import { state } from "../state/state";

interface IFormValues {
  track: string;
}

const schema = Yup.object().shape({
  track: Yup.string().required(),
});

export const Track = () => {
  const form = useForm<IFormValues>({
    initialValues: {
      track: "",
    },
    validate: yupResolver(schema),
  });
  const navigate = useNavigate();
  const {
    windowSizePosition,
    settings: { frequency },
  } = useSnapshot(state);

  const uniqueTracksDescriptions = useGetUniqueTrackDescriptions();

  // Close window and restore size, position, route
  const minimizeAndReturn = async () => {
    minimizeWindow();

    const windows = getAll();

    if (windows.length > 0) {
      const mainWindow = windows[0];

      // Set window on stored Size and Position
      const newSize = new PhysicalSize(windowSizePosition.width, windowSizePosition.height);
      await mainWindow.setSize(newSize);

      const newPosition = new PhysicalPosition(windowSizePosition.x, windowSizePosition.y);
      await mainWindow.setPosition(newPosition);

      // Disable window AlwaysOnTop
      mainWindow.setAlwaysOnTop(false);
    }

    navigate("/");
  };

  // Track and close window
  const addTrackAndCallback = useCallback(
    (track: string) => {
      addTrack(track, frequency);
      form.reset();
      minimizeAndReturn();
    },
    [form, frequency]
  );

  const onSubmit = useCallback(
    (values: IFormValues) => {
      addTrackAndCallback(values.track);
    },
    [addTrackAndCallback]
  );

  return (
    <>
      <SimpleGrid cols={2}>
        {uniqueTracksDescriptions.slice(-6).map((t) => (
          <Button fullWidth onClick={() => addTrackAndCallback(t)} key={t}>
            {t}
          </Button>
        ))}
      </SimpleGrid>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          required
          label="Track Description"
          placeholder="insert description"
          {...form.getInputProps("track")}
        />

        <Group position="apart" mt="md">
          <Button variant="outline" onClick={minimizeAndReturn}>
            Skip
          </Button>
          <Button type="submit">Add Track</Button>
        </Group>
      </form>
    </>
  );
};
