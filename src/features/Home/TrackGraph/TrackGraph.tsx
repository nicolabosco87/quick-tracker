import { useMantineTheme } from "@mantine/core";
import React, { useMemo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSnapshot } from "valtio";
import { calculateReminderMinutes, convertTime } from "../../../lib/utils";
import { state } from "../../../state/state";
import { IDayTracks } from "../Home";
import { useGetGraphColor } from "./trackGraph.hooks";

interface ITrackGraphProps {
  dayTracks: IDayTracks;
}

export const TrackGraph = ({ dayTracks }: ITrackGraphProps) => {
  const { settings } = useSnapshot(state);
  const theme = useMantineTheme();
  const getGraphColor = useGetGraphColor();

  const data = useMemo(() => {
    let tracketMinutes = 0;
    const groupedTracks: Record<string, number> = {};

    dayTracks.tracks.forEach((t) => {
      const trackTime = Number(t.duration ?? settings.frequency);
      groupedTracks[t.description] = groupedTracks[t.description]
        ? groupedTracks[t.description] + trackTime
        : trackTime;
      tracketMinutes += trackTime;
    });

    const untrackedMinutes = calculateReminderMinutes(settings).length * settings.frequency - tracketMinutes;

    const graphData = Object.keys(groupedTracks).map((k, index) => ({
      title: k,
      value: groupedTracks[k],
      color: getGraphColor(index),
    }));

    if (untrackedMinutes > 0) {
      graphData.push({
        title: "Untracked",
        value: untrackedMinutes,
        color: theme.colors.gray[1],
      });
    }

    return graphData;
  }, [dayTracks.tracks, getGraphColor, settings, theme.colors.gray]);

  return (
    <PieChart
      data={data}
      label={({ dataEntry }) => `${dataEntry.title}: ${convertTime(dataEntry.value * 60)}`}
      labelStyle={{
        fontSize: "0.2rem",
        background: "white",
        borderRadius: "3px",
        // fill: theme.primaryColor,
      }}
      style={{ maxHeight: 500 }}
      radius={32}
      labelPosition={100}
      animate
    />
  );
};
