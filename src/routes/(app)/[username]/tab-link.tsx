import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export const TabLink = component$(({ href }: { href: string }) => {
  const location = useLocation();
  return (
    <Link
      href={href}
      class={[
        "tab tab-bordered tab-lg text-sm",
        {
          "tab-active": location.url.pathname === href,
        },
      ]}
    >
      <Slot />
    </Link>
  );
});
