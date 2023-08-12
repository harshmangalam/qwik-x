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
import { ProfileIcon, ProfileOutlineIcon } from "~/icons/profile";
import { AccountMenu } from "./account-menu";
import { MenuItem } from "./menu-item";

export const Sidebar = component$(() => {
  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
    },
    {
      name: "Explore",
      href: "/explore/",
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
    {
      name: "Profile",
      href: "/profile/",
      icon: ProfileOutlineIcon,
      activeIcon: ProfileIcon,
    },
  ];
  return (
    <aside class="fixed top-0 bottom-0 flex flex-col gap-4 items-stretch w-64  overflow-y-auto justify-between py-2">
      <div>
        <div class="px-2">
          <Logo />
        </div>
        <ul class="menu menu-vertical menu-lg w-full gap-y-1">
          {links.map((link) => (
            <MenuItem key={link.name} {...link} />
          ))}
        </ul>
        <div class="w-full px-2">
          <Link href="/compose/tweet" class="btn btn-lg btn-primary btn-block">
            Post
          </Link>
        </div>
      </div>

      <div class="mx-2">
        <AccountMenu />
      </div>
    </aside>
  );
});
