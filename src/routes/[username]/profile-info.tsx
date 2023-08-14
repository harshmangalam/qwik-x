import { component$ } from "@builder.io/qwik";

type Props = {
  name: string;
  username: string;
  bio?: string;
};
export const ProfileInfo = component$<Props>((props) => {
  const { name, username, bio } = props;
  return (
    <div class="mt-4">
      <h3 class="text-xl font-bold ">{name}</h3>
      <p class="opacity-70">{username}</p>
      <p class="mt-4">{bio}</p>
    </div>
  );
});
