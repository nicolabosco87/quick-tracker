import { Select, SelectItem, SelectProps } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { useGetUniqueTrackDescriptions } from "../hooks/useGetUniqueTrackDescriptions";

type TrackDescriptionSelectProps = Partial<SelectProps & React.RefAttributes<HTMLInputElement>>;

export const TrackDescriptionSelect = ({ ...otherProps }: TrackDescriptionSelectProps) => {
  const uniqueTracksDescriptions = useGetUniqueTrackDescriptions();
  const trackOptions: SelectItem[] = useMemo(
    () =>
      uniqueTracksDescriptions.sort().map((t) => ({
        value: t,
        label: t,
      })),
    []
  );

  const [editableTrackOptions, seteditableTrackOptions] = useState<SelectItem[]>(trackOptions);

  return (
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
      {...otherProps}
    />
  );
};
