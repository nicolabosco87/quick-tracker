import React from "react";

import { minimizeWindow } from "../lib/utils";
import { TrackForm } from "./TrackForm/TrackForm";

// interface IFormValues {
//   track: string;
// }

// const schema = Yup.object().shape({
//   track: Yup.string().required(),
// });

export const Track = () => {
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

  return (
    <TrackForm afterTrack={minimizeWindow} onSkip={minimizeWindow} />
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
