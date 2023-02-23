import { Box } from "@mantine/core";
import React, { ReactNode } from "react";

type TContentProps = {
  children: ReactNode;
};
export const PaddedContent = ({ children }: TContentProps) => {
  return <Box sx={{ padding: 15 }}>{children}</Box>;
};
