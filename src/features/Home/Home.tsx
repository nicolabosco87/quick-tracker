import { ActionIcon, Box, Divider, Grid, Group, Indicator, Space, Tabs, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { state } from "../../state/state";

import { Calendar } from "@mantine/dates";
import { IconCalendarEvent, IconChartPie3, IconChevronLeft, IconChevronRight, IconTable } from "@tabler/icons";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";
import { SectionTitle } from "../../components/SectionTitle";
import { localeDate } from "../../lib/i18n";
import { Track } from "../../state/types";
import { TrackGraph } from "./TrackGraph/TrackGraph";
import { TrackTable } from "./TrackTable/TrackTable";

export interface IDayTracks {
  day: string;
  tracks: Track[];
}

export const Home = () => {
  const [selectedDay, setselectedDay] = useState<Date | null>(new Date());

  const { trackings } = useSnapshot(state);

  // group trackings
  const groupedTrackings = useMemo(() => {
    const gt = new Map<string, IDayTracks>();

    trackings.forEach((track: Track) => {
      const dayKey = dayjs(track.startTime).format("YYYY-MM-DD");
      const dayFormatted = dayjs(track.startTime).format("DD/MM/YYYY");

      // Set day initial tracks
      if (!gt.has(dayKey)) {
        gt.set(dayKey, { day: dayFormatted, tracks: [] });
      }

      const current = gt.get(dayKey);
      if (current) {
        gt.set(dayKey, { ...current, tracks: [...current.tracks, track] });
      }
    });

    return gt;
  }, [trackings]);

  // Group trackings by day
  const dayTrackings: IDayTracks = useMemo(() => {
    const currentDayKey = dayjs(selectedDay).format("YYYY-MM-DD");
    return (
      groupedTrackings.get(currentDayKey) ?? {
        day: dayjs(selectedDay).format("DD/MM/YYYY"),
        tracks: [],
      }
    );
  }, [groupedTrackings, selectedDay]);

  const setToday = () => setselectedDay(new Date());
  const setPreviousDay = () => setselectedDay(dayjs(selectedDay).subtract(1, "day").toDate());
  const setNextDay = () => setselectedDay(dayjs(selectedDay).add(1, "day").toDate());

  return (
    <>
      <SectionTitle>Track History {dayTrackings.day}</SectionTitle>
      {groupedTrackings.size === 0 ? <Text>No data logged</Text> : null}

      <Grid gutter={15} columns={24}>
        <Grid.Col span={"content"}>
          <Group>
            <ActionIcon onClick={setPreviousDay} variant="transparent" color="ocean-blue" size="lg">
              <IconChevronLeft />
            </ActionIcon>
            <Box sx={{ flex: 1 }}>{selectedDay && localeDate(selectedDay)}</Box>
            <ActionIcon onClick={setToday} variant="transparent" color="ocean-blue" size="lg">
              <IconCalendarEvent />
            </ActionIcon>
            <ActionIcon onClick={setNextDay} variant="transparent" color="ocean-blue" size="lg">
              <IconChevronRight />
            </ActionIcon>
          </Group>

          <Space h={10} />

          <Calendar
            value={selectedDay}
            onChange={setselectedDay}
            renderDay={(date) => {
              const day = date.getDate();
              return (
                <Indicator
                  size={6}
                  color="light-green"
                  offset={8}
                  disabled={!groupedTrackings.has(dayjs(date).format("YYYY-MM-DD"))}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }}
          />
        </Grid.Col>
        <Grid.Col span={1} sx={{ justifyContent: "center", display: "flex" }}>
          <Divider orientation="vertical" sx={{ height: "100%" }} />
        </Grid.Col>
        <Grid.Col span="auto">
          <Tabs defaultValue="graph">
            <Tabs.List>
              <Tabs.Tab value="graph" icon={<IconChartPie3 />}>
                Graph
              </Tabs.Tab>
              <Tabs.Tab value="table" icon={<IconTable />}>
                Table
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="graph" pt="xs">
              <TrackGraph dayTracks={dayTrackings} />
            </Tabs.Panel>

            <Tabs.Panel value="table" pt="xs">
              <TrackTable dayTracks={dayTrackings} />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </>
  );
};
