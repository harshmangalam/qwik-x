import { component$ } from "@builder.io/qwik";

export const ListAvatar = component$(() => {
  return (
    <div class="avatar">
      <div class="w-12 h-12 mask mask-squircle">
        <img
          width={48}
          height={48}
          src="https://avatars.githubusercontent.com/u/57381638?v=4"
        />
      </div>
    </div>
  );
});
