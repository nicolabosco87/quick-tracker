import { ActionIcon, Group } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { deleteTrack } from "../../../state/actions";
import { TTrack } from "../../../state/state";
import { TrackRowEdit } from "./TrackRowEdit";

interface ITrackRowProps {
  track: TTrack;
}

export const TrackRow = ({ track }: ITrackRowProps) => {
  const [editMode, seteditMode] = useState(false);

  const onComplete = () => seteditMode(false);

  const openDeleteConfirm = () =>
    openConfirmModal({
      title: "Are you sure to delete this tracking?",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deleteTrack(track.id),
    });

  if (editMode) {
    return <TrackRowEdit track={track} onComplete={onComplete} />;
  }

  return (
    <tr key={track.startTime.toString()}>
      <td>{dayjs(track.startTime).format("HH:mm")}</td>
      <td>{track.description}</td>
      <td>
        <Group position="right" spacing={5}>
          <ActionIcon variant="filled" color="ocean-blue" onClick={() => seteditMode(true)}>
            <IconEdit size={14} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red.9" onClick={openDeleteConfirm}>
            <IconTrash size={14} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
};
