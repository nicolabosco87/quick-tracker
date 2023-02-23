import * as Yup from "yup";

import { Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useCallback } from "react";

import { useSnapshot } from "valtio";
import { state } from "../../state/state";
import { addTrack } from "../../state/actions";
import { useGetUniqueTrackDescriptions } from "../../hooks/useGetUniqueTrackDescriptions";

interface IFormValues {
  track: string;
}

const schema = Yup.object().shape({
  track: Yup.string().required(),
});

type TrackFormProps = {
  afterTrack?: () => void;
  onSkip?: () => void;
};

export const TrackForm = ({ afterTrack, onSkip }: TrackFormProps) => {
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

  const addTrackAndCallback = useCallback(
    (track: string) => {
      addTrack(track, frequency);
      form.reset();
      if (afterTrack) {
        afterTrack();
      }
    },
    [afterTrack, form, frequency]
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
          {onSkip ? (
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
          ) : null}
          <Button type="submit">Add Track</Button>
        </Group>
      </form>
    </>
  );
};
