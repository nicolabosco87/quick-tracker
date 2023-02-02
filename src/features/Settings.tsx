import { ActionIcon, Box, Button, Container, Group, Paper, Select, Space, Text, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import React from "react";
import uniqid from "uniqid";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { DEFAULT_FREQUENCY } from "../consts";
import { updateSettings } from "../state/actions";
import { state, Frequency } from "../state/state";
interface FormValues {
  frequency: Frequency;
  ranges: { start: Date; end: Date }[];
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

  const { insertListItem, getInputProps, removeListItem, values, onSubmit } = useForm<FormValues>({
    initialValues: {
      frequency: settings?.frequency ?? DEFAULT_FREQUENCY,
      ranges: settings?.ranges.map((r) => ({
        start: dayjs(`2000-01-01 ${r.start}`).toDate(),
        end: dayjs(`2000-01-01 ${r.end}`).toDate(),
      })),
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = (values: FormValues) => {
    updateSettings({
      frequency: values.frequency as Frequency,
      ranges: values.ranges.map((r) => ({
        start: dayjs(r.start).format("HH:mm"),
        end: dayjs(r.end).format("HH:mm"),
      })),
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
    <Container>
      <Title order={3}>Settings</Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Select
          label="Frequency"
          data={[
            {
              value: 1,
              label: 1,
            },
            {
              value: 15,
              label: 15,
            },
            {
              value: 30,
              label: 30,
            },
            {
              value: 60,
              label: 60,
            },
          ]}
          {...getInputProps("frequency")}
        />

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

        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Container>
  );
};
