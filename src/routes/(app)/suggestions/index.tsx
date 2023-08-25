import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { User } from "~/components/user";
import { fetchAllUserSuggestions } from "~/utils/users";

export const useSuggestions = routeLoader$(async (requestEvent) => {
  return fetchAllUserSuggestions(requestEvent);
});

export default component$(() => {
  const usersSig = useSuggestions();
  return (
    <div>
      <h3 class="font-bold text-xl mb-4 p-4">Suggestions</h3>
      <ul class="rounded-box flex flex-col bg-base-100">
        {usersSig.value.map((user) => (
          <li key={user.id} class="hover:bg-base-200 py-2 px-4">
            <User key={user.id} {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
});
