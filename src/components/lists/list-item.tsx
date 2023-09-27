import { component$ } from "@builder.io/qwik";
import { LockIcon } from "~/icons";
import { ListPin } from "./list-pin";
import { type List } from "~/database/schema";
import { Avatar } from "../ui/avatar";
import { ListOulineIcon } from "~/icons/list";
import { Link } from "@builder.io/qwik-city";

type Props = List & {
  hasPinned?: boolean;
  owner: {
    avatar: any;
    username: string;
    name: string;
  };
};
export const ListItem = component$((props: Props) => {
  const { id, name, owner, isPrivate, hasPinned } = props;

  return (
    <li class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <Avatar
          size="md"
          colorSchema="primary"
          mask="mask mask-squircle"
          isPlaceholder
        >
          <ListOulineIcon />
        </Avatar>
        <div class="flex flex-col gap-0">
          <div class="flex items-center gap-1">
            <Link href={`/lists/${id}`} class="font-bold link link-hover">
              {name}
            </Link>
            {isPrivate && <LockIcon size={16} />}
          </div>
          <div class="flex items-center gap-1">
            <Avatar src={owner.avatar?.url} size="xs" circle />
            <div class="font-bold text-sm">{owner.name}</div>
            <div class="opacity-60 text-sm">@{owner.username}</div>
          </div>
        </div>
      </div>
      <ListPin listId={id} pinned={hasPinned} />
    </li>
  );
});
