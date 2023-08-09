import { component$ } from "@builder.io/qwik";

export const Sidebar = component$(() => {
  return (
    <aside>
      <div class="w-14 h-14">
        <img src="favicon.svg" alt="Logo" width={56} height={56} />
      </div>
    </aside>
  );
});
