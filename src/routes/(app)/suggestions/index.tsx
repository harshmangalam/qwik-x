import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { User } from "~/components/user";
import { fetchAllUserSuggestions } from "~/utils/users";

export const useSuggestions = routeLoader$(async (requestEvent) => {
  return fetchAllUserSuggestions(requestEvent);
});

export default component$(() => {
  const usersSig = useSuggestions();
  return (
    <div>
      <PageHeader title="Suggestions" />
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
