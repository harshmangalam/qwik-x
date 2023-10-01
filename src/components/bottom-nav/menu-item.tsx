import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

type Props = {
  name: string;
  activeIcon: any;
  href: string;
  icon: any;
};
export const MenuItem = component$<Props>((props) => {
  const location = useLocation();
  const { activeIcon: ActiveIcon, href, icon: Icon, name } = props;
  return (
    <li>
      <Link
        href={href}
        class={[
          "flex justify-center rounded-full",
          {
            active: location.url.pathname === href,
          },
        ]}
      >
        {location.url.pathname === href ? <ActiveIcon /> : <Icon />}
      </Link>
      <span class={[
          "text-xs text-slate-500",
          {
            "text-black": location.url.pathname === href,
          },
        ]}>{name}</span>
    </li>
  );
});
