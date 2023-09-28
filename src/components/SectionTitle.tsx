import { Divider, Text, Title } from "@mantine/core";
import React, { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  subtitle?: string;
};

export const SectionTitle = ({ children, subtitle }: SectionTitleProps) => {
  return (
    <>
      <Title order={3} color="ocean-blue" mb={15}>
        {children}
      </Title>

      {subtitle && (
        <Text mb={10} size={"sm"}>
          {subtitle}
        </Text>
      )}

      <Divider mb={50} />
    </>
  );
};
