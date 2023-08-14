import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export const TabLink = component$(({ href }: { href: string }) => {
  const location = useLocation();
  return (
    <Link
      href={href}
      class={[
        "btn btn-ghost rounded-none",
        {
          "tab-active": location.url.pathname === href,
        },
      ]}
    >
      <Slot />
    </Link>
  );
});
