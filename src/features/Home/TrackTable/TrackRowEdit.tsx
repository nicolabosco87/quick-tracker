import { ActionIcon, Group, Select, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { IconArrowBackUp, IconDeviceFloppy } from "@tabler/icons";
import dayjs from "dayjs";
import React from "react";
import * as Yup from "yup";
import { useFrequenciesOptions } from "../../../hooks/useFrequenciesOptions";
import { editTrack } from "../../../state/actions";
import { Frequency, Track } from "../../../state/types";

interface ITrackRowEditProps {
  track: Track;
  onComplete: () => void;
}

const schema = Yup.object().shape({
  startDate: Yup.date().required(),
  startTime: Yup.date().required(),
  duration: Yup.string().required(),
  description: Yup.string().required(),
});

export const TrackRowEdit = ({ track, onComplete }: ITrackRowEditProps) => {
  const frequenciesOptions = useFrequenciesOptions();

  const { getInputProps, values, validate } = useForm({
    initialValues: {
      startDate: new Date(track.startTime),
      startTime: new Date(track.startTime),
      duration: String(track.duration),
      description: track.description,
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = () => {
    const result = validate();
    if (result.hasErrors) return;

    editTrack({
      ...track,
      description: values.description,
      duration: Number(values.duration) as Frequency,
      startTime: new Date(
        `${dayjs(values.startDate).format("YYYY-MM-DD")} ${dayjs(values.startTime).format("HH:mm:ss")}`
      ),
    });
    onComplete();
  };

  const undo = () => onComplete();

  return (
    <tr key={track.startTime.toString()}>
      <td>
        <DatePicker {...getInputProps("startDate")} />
        <TimeInput {...getInputProps("startTime")} />
      </td>
      <td>
        <TextInput {...getInputProps("description")} />
      </td>
      <td>
        <Select
          data={frequenciesOptions}
          label="Duration"
          placeholder="insert duration"
          {...getInputProps("duration")}
        />
      </td>
      <td>
        <Group position="right" spacing={5}>
          <ActionIcon onClick={undo} variant="outline" color="green">
            <IconArrowBackUp size={14} />
          </ActionIcon>
          <ActionIcon variant="filled" color="ocean-blue" type="submit" onClick={handleSubmit}>
            <IconDeviceFloppy size={14} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
};
