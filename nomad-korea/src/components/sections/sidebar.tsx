import { SidebarMeetups } from "./sidebar-meetups";
import { SidebarMonthlyStay } from "./sidebar-monthly-stay";
import { SidebarCommunity } from "./sidebar-community";
import { SidebarEditorial } from "./sidebar-editorial";
import { SidebarAd } from "./sidebar-ad";

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <SidebarMeetups />
      <SidebarMonthlyStay />
      <SidebarCommunity />
      <SidebarEditorial />
      <SidebarAd />
    </aside>
  );
}
