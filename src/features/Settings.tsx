import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Switch,
  Text,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import uniqid from "uniqid";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { SectionTitle } from "../components/SectionTitle";
import { DEFAULT_FREQUENCY, DEFAULT_MAX_SUGGESTIONS } from "../consts";
import { useFrequenciesOptions } from "../hooks/useFrequenciesOptions";
import { updateSettings } from "../state/actions";
import { state } from "../state/state";
import { ActiveDay, Frequency, PopupPosition } from "../state/types";
interface FormValues {
  frequency: string;
  maxSuggestions: number;
  ranges: { start: Date; end: Date }[];
  popupPosition: string;
  activeDays: string[];
  temporaryDisabled: boolean;
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
      maxSuggestions: settings?.maxSuggestions ?? DEFAULT_MAX_SUGGESTIONS,
      ranges: settings?.ranges.map((r) => ({
        start: dayjs(`2000-01-01 ${r.start}`).toDate(),
        end: dayjs(`2000-01-01 ${r.end}`).toDate(),
      })),
      activeDays: settings.activeDays,
      popupPosition: String(settings?.popupPosition) ?? String(),
      temporaryDisabled: settings.temporaryDisabled,
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = (values: FormValues) => {
    updateSettings({
      frequency: Number(values.frequency) as Frequency,
      maxSuggestions: Number(values.maxSuggestions),
      ranges: values.ranges.map((r) => ({
        start: dayjs(r.start).format("HH:mm"),
        end: dayjs(r.end).format("HH:mm"),
      })),
      activeDays: values.activeDays as ActiveDay[],
      popupPosition: values.popupPosition as PopupPosition,
      temporaryDisabled: values.temporaryDisabled,
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
        <Grid gutter={16} mb={20}>
          <Grid.Col md={6}>
            <Select label="Frequency" data={frequencies} {...getInputProps("frequency")} />
          </Grid.Col>
          <Grid.Col md={6}>
            <NumberInput label="Maximum suggestions" {...getInputProps("maxSuggestions")} min={1} />
          </Grid.Col>
          <Grid.Col md={6}>
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
          </Grid.Col>
          <Grid.Col md={6}>
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
          </Grid.Col>

          <Grid.Col md={6}>
            <Checkbox.Group orientation="vertical" label="Active days" withAsterisk {...getInputProps("activeDays")}>
              <Checkbox value={ActiveDay.Sunday} label="Sunday" />
              <Checkbox value={ActiveDay.Monday} label="Monday" />
              <Checkbox value={ActiveDay.Tuesday} label="Tuesday" />
              <Checkbox value={ActiveDay.Wednesday} label="Wednesday" />
              <Checkbox value={ActiveDay.Thursday} label="Thuersday" />
              <Checkbox value={ActiveDay.Friday} label="Friday" />
              <Checkbox value={ActiveDay.Saturday} label="Saturday" />
            </Checkbox.Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col md={6}>
            <Text size="sm" sx={{ fontWeight: 500 }} mb={5}>
              Disable temporary?
            </Text>
            <Switch
              label="This will disabled all popups"
              color="red"
              {...getInputProps("temporaryDisabled")}
              defaultChecked={settings.temporaryDisabled}
            />
          </Grid.Col>
        </Grid>

        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
};
