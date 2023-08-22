import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { User } from "~/components/user";
import { fetchProfileFollowings } from "~/utils/follow";

export const useFollowings = routeLoader$(async (requestEvent) => {
  return fetchProfileFollowings(requestEvent);
});
export default component$(() => {
  const users = useFollowings();
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
