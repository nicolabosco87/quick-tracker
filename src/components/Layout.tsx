import { AppShell, Navbar } from "@mantine/core";
import { ReactNode } from "react";
import { Menu } from "./Menu";

type TLayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: TLayoutProps) => (
  <>
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 70 }} sx={(theme) => ({ background: theme.colors["green"][1] })} p="xs">
          <Navbar.Section grow>
            <Menu />
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  </>
);
