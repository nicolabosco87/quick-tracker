import { Title } from "@mantine/core";
import React, { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <Title order={3} variant="gradient" mb={15}>
      {children}
    </Title>
  );
};
