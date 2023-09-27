import { component$ } from "@builder.io/qwik";
import { ListOulineIcon } from "~/icons/list";

export const ListAvatar = component$(() => {
  return (
    <div class="avatar placeholder">
      <div class="w-12 h-12 mask mask-squircle bg-primary-focus text-primary-content">
        <ListOulineIcon />
      </div>
    </div>
  );
});
