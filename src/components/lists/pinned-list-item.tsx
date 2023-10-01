import { component$ } from "@builder.io/qwik";
import { LockIcon } from "~/icons";
import { Avatar } from "../ui/avatar";
import { ListOulineIcon } from "~/icons/list";
import { Link } from "@builder.io/qwik-city";

type Props = {
  id: number;
  name: string;
  isPrivate: boolean;
};
export default component$((props: Props) => {
  const { id, isPrivate, name } = props;
  return (
    <li class="flex flex-col items-center gap-2">
      <Avatar
        size="xl"
        isPlaceholder
        colorSchema="primary"
        mask="mask mask-squircle"
      >
        <ListOulineIcon size={48} />
      </Avatar>
      <div class="flex items-center gap-1">
        <Link href={`/lists/${id}`} class="font-bold link link-hover">
          {name}
        </Link>
        {isPrivate && <LockIcon size={16} />}
      </div>
    </li>
  );
});
