import { getAll, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

import { minimizeWindow } from "../lib/utils";
import { state } from "../state/state";
import { TrackForm } from "./TrackForm/TrackForm";

// interface IFormValues {
//   track: string;
// }

// const schema = Yup.object().shape({
//   track: Yup.string().required(),
// });

export const Track = () => {
  const navigate = useNavigate();
  const { windowSizePosition } = useSnapshot(state);
  // const form = useForm<IFormValues>({
  //   initialValues: {
  //     track: "",
  //   },
  //   validate: yupResolver(schema),
  // });

  // const {
  //   trackings,
  //   settings: { frequency },
  // } = useSnapshot(state);

  // const addAndMinimize = useCallback(
  //   (track: string) => {
  //     addTrack(track, frequency);
  //     minimizeWindow();
  //   },
  //   [frequency]
  // );

  // const onSubmit = useCallback(
  //   (values: IFormValues) => {
  //     addAndMinimize(values.track);
  //   },
  //   [addAndMinimize]
  // );

  // const uniqueTrackings: string[] = trackings.reduce((prev, t) => {
  //   if (prev.indexOf(t.description) < 0) {
  //     prev.push(t.description);
  //   }
  //   return prev;
  // }, []);

  // const skipOnClick = () => {
  //   minimizeWindow();
  // };

  const minimizeAndReturn = async () => {
    minimizeWindow();

    const windows = getAll();

    if (windows.length > 0) {
      const mainWindow = windows[0];

      const newSize = new PhysicalSize(windowSizePosition.width, windowSizePosition.height);
      await mainWindow.setSize(newSize);

      const newPosition = new PhysicalPosition(windowSizePosition.x, windowSizePosition.y);
      await mainWindow.setPosition(newPosition);
    }

    navigate("/");
  };

  return (
    <TrackForm afterTrack={minimizeAndReturn} onSkip={minimizeAndReturn} />
    // <>
    //   <SimpleGrid cols={2}>
    //     {uniqueTrackings.slice(-6).map((t) => (
    //       <Button fullWidth onClick={() => addAndMinimize(t)} key={t}>
    //         {t}
    //       </Button>
    //     ))}
    //   </SimpleGrid>

    //   <form onSubmit={form.onSubmit(onSubmit)}>
    //     <TextInput
    //       required
    //       label="Track Description"
    //       placeholder="insert description"
    //       {...form.getInputProps("track")}
    //     />

    //     <Group position="apart" mt="md">
    //       <Button variant="outline" onClick={skipOnClick}>
    //         Skip
    //       </Button>
    //       <Button type="submit">Submit</Button>
    //     </Group>
    //   </form>
    // </>
  );
};
