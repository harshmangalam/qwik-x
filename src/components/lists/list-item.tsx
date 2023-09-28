import { component$ } from "@builder.io/qwik";
import { LockIcon } from "~/icons";
import { ListPin } from "./list-pin";
import { type List } from "~/database/schema";
import { Avatar } from "../ui/avatar";
import { ListOulineIcon } from "~/icons/list";
import { Link } from "@builder.io/qwik-city";

type Props = List & {
  membersCount: number;
  isMember?: boolean;
  hasPinned?: boolean;
  owner: {
    avatar: any;
    username: string;
    name: string;
  };
};
export const ListItem = component$((props: Props) => {
  const { id, name, owner, isPrivate, hasPinned, membersCount } = props;

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
            {membersCount > 0 && (
              <div class="opacity-70 text-sm">
                <span>· </span>
                <span>{membersCount} </span>
                <span> members</span>
              </div>
            )}
          </div>
          <div class="flex items-center gap-1">
            <Avatar src={owner.avatar?.url} size="xs" circle />
            <Link
              class="font-bold text-sm link link-hover"
              href={`/${owner.username}/`}
            >
              {owner.name}
            </Link>
            <Link
              href={`/${owner.username}/`}
              class="opacity-60 text-sm link link-hover"
            >
              @{owner.username}
            </Link>
          </div>
        </div>
      </div>
      <ListPin listId={id} pinned={hasPinned} />
    </li>
  );
});
