import { Table } from "@mantine/core";
import React from "react";
import { IDayTracks } from "../Home";
import { TrackRow } from "./TrackRow";

type TTrackTableProps = {
  dayTracks: IDayTracks;
};

export const TrackTable = ({ dayTracks }: TTrackTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Hour</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {dayTracks.tracks.map((t) => (
          <TrackRow key={t.id} track={t} />
        ))}
      </tbody>
    </Table>
  );
};
