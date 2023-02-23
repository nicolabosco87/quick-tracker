import { AppShell, Navbar } from "@mantine/core";
import { ReactNode } from "react";
import { HeadBar } from "./HeadBar";
import { Menu } from "./Menu";

type TLayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: TLayoutProps) => (
  <>
    <AppShell
      padding="md"
      header={<HeadBar />}
      navbar={
        <Navbar width={{ base: 70 }} sx={(theme) => ({ background: theme.colors["green"][1] })} p="xs">
          {/* First section with normal height (depends on section content) */}
          {/* <Navbar.Section>First section</Navbar.Section> */}

          {/* Grow section will take all available space that is not taken by first and last sections */}
          <Navbar.Section grow>
            <Menu />
          </Navbar.Section>

          {/* Last section with normal height (depends on section content) */}
          {/* <Navbar.Section>Last section</Navbar.Section> */}
        </Navbar>
      }
    >
      {children}
    </AppShell>
  </>
);
