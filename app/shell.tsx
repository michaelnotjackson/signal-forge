import {
  AppShell,
  TopNav,
  TopNavHeading,
  TopNavItem,
  NavIcon,
} from "@astryxdesign/core";
import { Outlet } from "react-router";

import { Anvil } from "lucide-react";

type NavItem = {
  name: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [{ name: "Dashboard", path: "/dashboard" }];

export default function Shell() {
  return (
    <AppShell
      topNav={
        <TopNav>
          <TopNavHeading
            heading="Signal Forge"
            logo={<NavIcon icon={<Anvil />} />}
          />

          {NAV_ITEMS.map((item) => (
            <TopNavItem key={item.path} label={item.name} href={item.path} />
          ))}
        </TopNav>
      }
    >
      <Outlet />
    </AppShell>
  );
}
