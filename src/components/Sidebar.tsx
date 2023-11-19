import TrafficLights from "./TrafficLights";
import { SidebarItem } from "./ui/SidebarItem";
// import {
//   // Shield,
//   Star,
//   Trash,
//   KeyRound,
//   StickyNote,
//   type LucideIcon,
// } from "lucide-react";
import { textVariants } from "./ui/Typography";

export type SidebarItemAttrs = {
  to: string;
  Icon: string;
  iconDefaultColor: string;
  text: string;
};

const sidebarItems: SidebarItemAttrs[] = [
  {
    to: "/all",
    Icon: "shield",
    text: "All Items",
    iconDefaultColor: "text-blue-500 fill-blue-500",
  },
  {
    to: "/favorites",
    Icon: "star",
    text: "Favorites",
    iconDefaultColor: "text-yellow-500 fill-yellow-500",
  },
  {
    to: "/trash",
    Icon: "recycling",
    text: "Trash",
    iconDefaultColor: "text-red-500 fill-red-500",
  },
];

const typeItems: SidebarItemAttrs[] = [
  {
    to: "/type/login",
    Icon: "pin",
    text: "Login",
    iconDefaultColor: "text-neutral-400 fill-neutral-400",
  },
  {
    to: "/type/note",
    Icon: "sticky_note",
    text: "Secure Note",
    iconDefaultColor: "text-neutral-400 fill-neutral-400",
  },
];

export default function Sidebar() {
  return (
    <aside
      data-tauri-drag-region
      className="h-full w-64 bg-neutral-800 border-r border-r-black p-4"
    >
      <TrafficLights className="m-2 mb-6 w-fit" />
      <nav className="flex flex-col items-stretch">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.Icon}
            iconDefaultColor={item.iconDefaultColor}
          >
            {item.text}
          </SidebarItem>
        ))}
        <h3
          className={textVariants({
            type: "subheadline",
            className: "mt-6 mb-2",
          })}
        >
          Types
        </h3>
        {typeItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.Icon}
            iconDefaultColor={item.iconDefaultColor}
          >
            {item.text}
          </SidebarItem>
        ))}
      </nav>
    </aside>
  );
}
