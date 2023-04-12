import { ActionIcon, Box, Button, Group, Paper, Select, Space, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import uniqid from "uniqid";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { SectionTitle } from "../components/SectionTitle";
import { DEFAULT_FREQUENCY } from "../consts";
import { useFrequenciesOptions } from "../hooks/useFrequenciesOptions";
import { updateSettings } from "../state/actions";
import { state } from "../state/state";
import { Frequency, PopupPosition } from "../state/types";
interface FormValues {
  frequency: string;
  ranges: { start: Date; end: Date }[];
  popupPosition: string;
}

const schema = Yup.object().shape({
  frequency: Yup.string().required(),
  ranges: Yup.array().of(
    Yup.object().shape({
      start: Yup.date().required("Start time is required"),
      end: Yup.date().required("End time is required"),
    })
  ),
});

export const Settings = () => {
  const { settings } = useSnapshot(state);
  const frequencies = useFrequenciesOptions();

  const { insertListItem, getInputProps, removeListItem, values, onSubmit } = useForm<FormValues>({
    initialValues: {
      frequency: String(settings?.frequency) ?? String(DEFAULT_FREQUENCY),
      ranges: settings?.ranges.map((r) => ({
        start: dayjs(`2000-01-01 ${r.start}`).toDate(),
        end: dayjs(`2000-01-01 ${r.end}`).toDate(),
      })),
      popupPosition: String(settings?.popupPosition) ?? String(),
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = (values: FormValues) => {
    updateSettings({
      frequency: Number(values.frequency) as Frequency,
      ranges: values.ranges.map((r) => ({
        start: dayjs(r.start).format("HH:mm"),
        end: dayjs(r.end).format("HH:mm"),
      })),
      popupPosition: values.popupPosition as PopupPosition,
    });
    showNotification({
      autoClose: 5000,
      message: "Settings updated",
      icon: <IconCheck />,
    });
  };

  // Nested arrays: https://mantine.dev/form/nested/#nested-arrays
  const rangeFields = values.ranges.map((item, index) => {
    return (
      <Group key={index} mt="xs" position="left">
        <TimeInput {...getInputProps(`ranges.${index}.start`)} />
        <TimeInput {...getInputProps(`ranges.${index}.end`)} />

        <ActionIcon color="red" onClick={() => removeListItem("ranges", index)}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <>
      <SectionTitle>Settings</SectionTitle>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Select label="Frequency" data={frequencies} {...getInputProps("frequency")} />

        <Space h={20} />

        <Text size="sm" sx={{ fontWeight: 500 }} mb={5}>
          Ranges
        </Text>
        <Paper shadow="xs" p="md">
          <Group position="apart" align="start">
            <Box>{rangeFields}</Box>
            <Button
              color="green"
              variant="light"
              onClick={() => insertListItem("ranges", { name: "", active: false, key: uniqid() })}
            >
              Add Range
            </Button>
          </Group>
        </Paper>

        <Space h={20} />

        <Select
          label="Popup Position"
          data={[
            {
              value: PopupPosition.TopLeft,
              label: "Top Left",
            },
            {
              value: PopupPosition.TopCenter,
              label: "Top Center",
            },
            {
              value: PopupPosition.TopRight,
              label: "Top Right",
            },
            {
              value: PopupPosition.MiddleLeft,
              label: "Middle Left",
            },
            {
              value: PopupPosition.MiddleCenter,
              label: "Middle Center",
            },
            {
              value: PopupPosition.MiddleRight,
              label: "Middle Right",
            },
            {
              value: PopupPosition.BottomLeft,
              label: "Bottom Left",
            },
            {
              value: PopupPosition.BottomCenter,
              label: "Bottom Center",
            },
            {
              value: PopupPosition.BottomRight,
              label: "Bottom Right",
            },
          ]}
          {...getInputProps("popupPosition")}
        />

        <Space h={20} />

        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
};
