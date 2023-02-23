import { Button, Grid, Group, Select, SelectItem } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { SectionTitle } from "../components/SectionTitle";
import { useFrequenciesOptions } from "../hooks/useFrequenciesOptions";
import { useGetUniqueTrackDescriptions } from "../hooks/useGetUniqueTrackDescriptions";
import { addTrack } from "../state/actions";
import { Frequency, state } from "../state/state";

interface IFormValues {
  track: string;
  duration: string;
  startDate: Date;
  startTime: Date;
}

const schema = Yup.object().shape({
  track: Yup.string().required(),
  duration: Yup.string().required(),
  startDate: Yup.string().required(),
  startTime: Yup.string().required(),
});

export const ManualTrack = () => {
  const {
    settings: { frequency },
  } = useSnapshot(state);
  const uniqueTracksDescriptions = useGetUniqueTrackDescriptions();
  const frequenciesOptions = useFrequenciesOptions();

  const trackOptions: SelectItem[] = uniqueTracksDescriptions.map((t) => ({
    value: t,
    label: t,
  }));

  const [editableTrackOptions, seteditableTrackOptions] = useState<SelectItem[]>(trackOptions);

  const form = useForm<IFormValues>({
    initialValues: {
      track: "",
      duration: String(frequency),
      startDate: new Date(),
      startTime: new Date(),
    },
    validate: yupResolver(schema),
  });

  const onSubmit = (values: IFormValues) => {
    addTrack(
      values.track,
      Number(values.duration) as Frequency,
      new Date(`${dayjs(values.startDate).format("YYYY-MM-DD")} ${dayjs(values.startTime).format("HH:mm:ss")}`)
    );

    showNotification({
      autoClose: 5000,
      message: "Tracking added",
      icon: <IconCheck />,
    });

    form.reset();
  };

  return (
    <>
      <SectionTitle>Add track</SectionTitle>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <Select
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                seteditableTrackOptions((current) => [...current, item]);
                return item;
              }}
              searchable
              data={editableTrackOptions}
              label="Track Description"
              placeholder="insert description"
              {...form.getInputProps("track")}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <Select
              data={frequenciesOptions}
              label="Duration"
              placeholder="insert duration"
              {...form.getInputProps("duration")}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <DatePicker label="Date" {...form.getInputProps("startDate")} />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <TimeInput label="Time" {...form.getInputProps("startTime")} />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col xs={12} sm={12} md={8} lg={6}>
            <Group position="right" mt="md">
              <Button type="submit">Add Track</Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};
