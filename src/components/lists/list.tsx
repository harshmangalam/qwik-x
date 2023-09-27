import { component$ } from "@builder.io/qwik";
import { ListAvatar } from "./list-avatar";
import { LockIcon, PinOutlineIcon } from "~/icons";
import { Button } from "../ui/button";

type Props = {
  title: string;
};
export const ListsComponent = component$((props: Props) => {
  const { title } = props;
  return (
    <div class="flex flex-col gap-4 px-4">
      <h3 class="text-xl font-bold">{title}</h3>
      <ul class="flex flex-col gap-3">
        {[...new Array(4)].map((list, i) => (
          <li key={i} class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <ListAvatar />
              <div class="flex flex-col gap-0">
                <div class="flex items-center gap-1">
                  <span class="font-bold">Qwik</span>
                  <LockIcon size={16} />
                </div>
                <div class="flex items-center gap-1">
                  <div class="avatar">
                    <div class="w-5 h-5 mask mask-squircle">
                      <img
                        width={20}
                        height={20}
                        src="https://avatars.githubusercontent.com/u/57381638?v=4"
                      />
                    </div>
                  </div>
                  <div class="font-bold text-sm">Harsh Mangalam</div>
                  <div class="opacity-60 text-sm">@harshmangalam</div>
                </div>
              </div>
            </div>
            <Button circle colorScheme="btn-ghost">
              <PinOutlineIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});
