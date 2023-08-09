import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";
import { Link } from "@builder.io/qwik-city";
import { HomeIcon, HomeOutlineIcon } from "~/icons/home";

export const Sidebar = component$(() => {
  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeOutlineIcon,
      activeIcon: HomeIcon,
    },
  ];
  return (
    <aside>
      <Logo />
      <ul class="menu menu-vertical">
        {links.map(({ name, activeIcon: ActiveIcon, href, icon: Icon }) => (
          <li key={name}>
            <Link href={href} class="flex items-center gap-4">
              <ActiveIcon />
              <span class="text-lg">Home</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
