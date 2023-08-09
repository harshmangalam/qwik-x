import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo";

export const Sidebar = component$(() => {
  return (
    <aside>
      <Logo />
    </aside>
  );
});
