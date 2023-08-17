import { component$ } from "@builder.io/qwik";
import { Button } from "../ui/button";
import { useLogout } from "~/routes/(app)/layout";
import { Form } from "@builder.io/qwik-city";
type Props = {
  avatar: string;
  name: string;
  username: string;
};
export const AccountMenu = component$<Props>((props) => {
  const { avatar, name, username } = props;
  const logoutSig = useLogout();

  return (
    <div class="dropdown dropdown-top">
      <label
        tabIndex={0}
        class="flex items-center gap-3  btn btn-lg btn-ghost px-3 py-2 btn-block"
      >
        <div class="avatar">
          <div class="w-11 mask mask-squircle">
            <img src={avatar} width={44} height={44} alt={name} />
          </div>
        </div>
        <div>
          <div class="font-semibold text-start">{name}</div>
          <div class="font-normal text-sm text-start">{username}</div>
        </div>
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
      >
        <Form action={logoutSig}>
          <li>
            <Button
              size="btn-sm"
              fullWidth
              colorScheme="btn-ghost"
              type="submit"
              loading={logoutSig.isRunning}
            >
              Log out @{username}
            </Button>
          </li>
        </Form>
      </ul>
    </div>
  );
});
