import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { Link } from "@builder.io/qwik-city";
import { HomeIcon, HomeOutlineIcon } from "~/icons/home";
import { SearchIcon, SearchOutlineIcon } from "~/icons/search";
import {
  NotificationIcon,
  NotificationOutlineIcon,
} from "~/icons/notification";
import { MessageIcon, MessageOutlineIcon } from "~/icons/message";
import { ListIcon, ListOulineIcon } from "~/icons/list";
import { CommunityIcon, CommunityOutlineIcon } from "~/icons/community";

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
    {
      name: "Messages",
      href: "/messages/",
      icon: MessageOutlineIcon,
      activeIcon: MessageIcon,
    },
    {
      name: "Lists",
      href: "/lists/",
      icon: ListOulineIcon,
      activeIcon: ListIcon,
    },
    {
      name: "Communities",
      href: "/communities/",
      icon: CommunityOutlineIcon,
      activeIcon: CommunityIcon,
    },
  ];
  return (
    <aside>
      <Logo />
      <ul class="menu menu-vertical menu-lg">
        {links.map(({ name, activeIcon: ActiveIcon, href, icon: Icon }) => (
          <li key={name}>
            <Link href={href} class="flex items-center gap-4 rounded-full">
              <Icon />
              <span class="text-lg">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
