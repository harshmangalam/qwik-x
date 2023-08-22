import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { User } from "~/components/user";
import { fetchProfileFollowers } from "~/utils/follow";

export const useFollowers = routeLoader$(async (requestEvent) => {
  return fetchProfileFollowers(requestEvent);
});
export default component$(() => {
  const users = useFollowers();
  return (
    <ul class="rounded-box flex flex-col bg-base-100">
      {users.value.map((user) => (
        <li key={user.id} class="hover:bg-base-200 py-2 px-4">
          <User key={user.id} {...user} />
        </li>
      ))}
    </ul>
  );
});
