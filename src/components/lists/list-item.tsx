import { component$ } from "@builder.io/qwik";
import { ListAvatar } from "./list-avatar";
import { LockIcon, PinOutlineIcon } from "~/icons";
import { Button } from "../ui/button";

type Props = {
  id: number;
  name: string;
  owner: {
    avatar: any;
    username: string;
    name: string;
  };
};
export const ListItem = component$((props: Props) => {
  const { name, owner } = props;
  return (
    <li class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <ListAvatar />
        <div class="flex flex-col gap-0">
          <div class="flex items-center gap-1">
            <span class="font-bold">{name}</span>
            <LockIcon size={16} />
          </div>
          <div class="flex items-center gap-1">
            <div class="avatar">
              <div class="w-5 h-5 mask mask-squircle">
                <img width={20} height={20} src={owner.avatar?.url} />
              </div>
            </div>
            <div class="font-bold text-sm">{owner.name}</div>
            <div class="opacity-60 text-sm">@{owner.username}</div>
          </div>
        </div>
      </div>
      <Button circle colorScheme="btn-ghost">
        <PinOutlineIcon />
      </Button>
    </li>
  );
});
