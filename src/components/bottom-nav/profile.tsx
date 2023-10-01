import { component$ } from "@builder.io/qwik";
import { Button } from "../ui/button";
import { useLogout } from "~/routes/(app)/layout";
import { Form } from "@builder.io/qwik-city";
type Props = {
  avatar: string;
  name: string;
};
export const Profile = component$<Props>((props) => {
  const { avatar, name } = props;
  const logoutSig = useLogout();

  return (
    <div class="dropdown dropdown-top dropdown-end">
      <label tabIndex={0} class="flex flex-col items-center gap-1">
        <div class="avatar">
          <div class="w-6 mask mask-squircle">
            <img src={avatar} width={24} height={24} alt={name} />
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content z-[1] w-30 menu p-2 shadow bg-base-100 rounded-box "
      >
        <Form action={logoutSig}>
          <li>
            <Button
              size="btn-md"
              fullWidth
              colorScheme="btn-ghost"
              type="submit"
              loading={logoutSig.isRunning}
            >
              Log out
            </Button>
          </li>
        </Form>
      </ul>
    </div>
  );
});
