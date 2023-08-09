import { component$ } from "@builder.io/qwik";

export const AccountMenu = component$(() => {
  return (
    <div class="dropdown dropdown-top dropdown-hover">
      <label
        tabIndex={0}
        class="flex items-center gap-3  btn btn-lg btn-ghost px-3 py-2 btn-block"
      >
        <div class="avatar">
          <div class="w-11 mask mask-squircle">
            <img
              src="https://avatars.githubusercontent.com/u/57381638?v=4"
              width={44}
              height={44}
            />
          </div>
        </div>
        <div>
          <div class="font-semibold text-start">Harsh Mangalam</div>
          <div class="font-normal text-sm text-start">@HarshMangalam6</div>
        </div>
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
});
