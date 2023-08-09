import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { Link } from "@builder.io/qwik-city";
import { HomeIcon, HomeOutlineIcon } from "~/icons/home";
import { SearchIcon, SearchOutlineIcon } from "~/icons/search";
import {
  NotificationIcon,
  NotificationOutlineIcon,
} from "~/icons/notification";

export const Sidebar = component$(() => {
  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
    },
    {
      name: "Search",
      href: "/search/",
      icon: SearchOutlineIcon,
      activeIcon: SearchIcon,
    },
    {
      name: "Notifications",
      href: "/notifications/",
      icon: NotificationOutlineIcon,
      activeIcon: NotificationIcon,
    },
  ];
  return (
    <aside class="fixed">
      <Logo />
      <ul class="menu menu-vertical">
        {links.map(({ name, activeIcon: ActiveIcon, href, icon: Icon }) => (
          <li key={name}>
            <Link href={href} class="flex items-center gap-4">
              <Icon />
              <span class="text-lg">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
