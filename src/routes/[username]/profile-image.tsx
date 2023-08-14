import { component$ } from "@builder.io/qwik";

export const ProfileImage = component$(() => {
  return (
    <section class="h-52 relative bg-gradient-to-r from-cyan-500 to-blue-500">
      <div class="absolute -bottom-16 left-6">
        <div class="avatar">
          <div class="w-36 rounded-full ring ring-base-100 ring-offset-2">
            <img
              src="https://avatars.githubusercontent.com/u/57381638?v=4"
              width={144}
              height={144}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
