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
          "flex items-center gap-4 px-3",
          {
            active: location.url.pathname === href,
          },
        ]}
      >
        {location.url.pathname === href ? <ActiveIcon /> : <Icon />}
        <span class="text-lg">{name}</span>
      </Link>
    </li>
  );
});
