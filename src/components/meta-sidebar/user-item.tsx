import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const UserItem = component$(() => {
  const handleFollow = $((ev: QwikMouseEvent) => {
    ev.stopPropagation();
  });
  return (
    <li>
      <Link href="/" class="rounded-none w-full block">
        <div class="flex items-center justify-between gap-4 w-full">
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="w-11 h-11 rounded-full">
                <img
                  src="https://pbs.twimg.com/profile_images/1650752290641547264/sb1RZ0Dj_400x400.jpg"
                  width={44}
                  height={44}
                />
              </div>
            </div>
            <div class="flex flex-col gap-0">
              <span class="font-bold">Khushboo Verma</span>
              <div class="leading-4 text-sm">
                <span> @khushbooverma_</span>
              </div>
            </div>
          </div>

          <button
            preventdefault:click
            onClick$={handleFollow}
            class="btn btn-primary btn-sm rounded-full"
          >
            Follow
          </button>
        </div>
      </Link>
    </li>
  );
});
