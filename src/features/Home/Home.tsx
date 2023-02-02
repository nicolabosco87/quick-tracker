import {
  Accordion,
  Container,
  Grid,
  Indicator,
  MediaQuery,
  Space,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import { state, TTrack } from "../../state/state";

import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";
import { TrackGraph } from "./TrackGraph/TrackGraph";
import { TrackTable } from "./TrackTable/TrackTable";
import { IconChartPie3, IconTable } from "@tabler/icons";

export interface IDayTracks {
  day: string;
  tracks: TTrack[];
}

export const Home = () => {
  const [selectedDay, setselectedDay] = useState<Date | null>(new Date());
  const theme = useMantineTheme();

  const { trackings } = useSnapshot(state);

  const groupedTrackings = useMemo(() => {
    const gt = new Map<string, IDayTracks>();

    trackings.forEach((track: TTrack) => {
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

  const elements = useMemo(() => {
    const el: React.ReactNode[] = [];

    new Map([...groupedTrackings.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))).forEach((dayTracks, key) => {
      el.push(
        <Accordion.Item value={key}>
          <Accordion.Control>
            <Title order={5}>{dayTracks.day}</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <TrackTable dayTracks={dayTracks} />
          </Accordion.Panel>
        </Accordion.Item>
      );
    });

    return el;
  }, [groupedTrackings]);

  const dayTrackings: IDayTracks = useMemo(() => {
    const currentDayKey = dayjs(selectedDay).format("YYYY-MM-DD");
    return (
      groupedTrackings.get(currentDayKey) ?? {
        day: dayjs(selectedDay).format("DD/MM/YYYY"),
        tracks: [],
      }
    );
  }, [groupedTrackings, selectedDay]);

  return (
    <>
      <Title order={3}>History</Title>
      {elements.length === 0 && <Text>No data logged</Text>}

      <Grid gutter={15}>
        <Grid.Col span={"content"}>
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
        <Grid.Col span="auto">
          <Title order={4}>{dayTrackings.day}</Title>
          <Space h={10} />

          <Tabs defaultValue="graph">
            <Tabs.List>
              <Tabs.Tab value="graph" icon={<IconChartPie3 />}>
                Graph
              </Tabs.Tab>
              <Tabs.Tab value="table" icon={<IconTable  />}>
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
