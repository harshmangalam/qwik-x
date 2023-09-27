import { component$ } from "@builder.io/qwik";
import { LockIcon } from "~/icons";
import { Avatar } from "../ui/avatar";
import { ListOulineIcon } from "~/icons/list";

type Props = {
  id: number;
  name: string;
  isPrivate: boolean;
};
export default component$((props: Props) => {
  const { isPrivate, name } = props;
  return (
    <div class="flex flex-col gap-2">
      <Avatar
        size="xl"
        isPlaceholder
        colorSchema="primary"
        mask="mask mask-squircle"
      >
        <ListOulineIcon size={48} />
      </Avatar>
      <div class="flex items-center gap-1">
        <span class="font-bold">{name}</span>
        {isPrivate && <LockIcon size={16} />}
      </div>
    </div>
  );
});
