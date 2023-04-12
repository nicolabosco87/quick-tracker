import { Button, Group, SimpleGrid } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { emit } from "@tauri-apps/api/event";
import { getAll } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { TrackDescriptionSelect } from "../components/TrackDescriptionSelect";
import { useGetUniqueTrackDescriptions } from "../hooks/useGetUniqueTrackDescriptions";

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
  const {
    settings: { frequency },
  } = useSnapshot(state);

  const uniqueTracksDescriptions = useGetUniqueTrackDescriptions();

  // Close window and restore size, position, route
  const minimizeAndReturn = async () => {
    const windows = getAll();
    const popupWindow = windows.find((w) => w.label === "popup");

    if (popupWindow) {
      popupWindow?.close();
    }
  };

  // Track and close window
  const addTrackAndCallback = useCallback(
    (track: string) => {
      emit("addTrack", {
        track,
        frequency,
      });
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
        {uniqueTracksDescriptions.slice(0, 6).map((t) => (
          <Button fullWidth onClick={() => addTrackAndCallback(t)} key={t}>
            {t}
          </Button>
        ))}
      </SimpleGrid>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TrackDescriptionSelect {...form.getInputProps("track")} />

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
