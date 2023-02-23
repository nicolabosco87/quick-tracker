import { Accordion, Grid, Indicator, Space, Tabs, Text, Title } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { state } from "../../state/state";

import { Calendar } from "@mantine/dates";
import { IconChartPie3, IconTable } from "@tabler/icons";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";
import { SectionTitle } from "../../components/SectionTitle";
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

  return (
    <>
      <SectionTitle>History</SectionTitle>
      {groupedTrackings.size === 0 ? <Text>No data logged</Text> : null}

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
