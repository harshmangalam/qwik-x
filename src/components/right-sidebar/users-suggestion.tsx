import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { User } from "../user";
import { useUserSuggesions } from "~/routes/(app)/layout";

export const UserSuggestions = component$(() => {
  const usersSig = useUserSuggesions();

  return (
    <ul class="rounded-box flex flex-col bg-base-200">
      <li class="text-xl font-bold py-3 px-4">Who to follow</li>
      {usersSig.value.map((user) => (
        <li key={user.id} class="hover:bg-base-300 py-2 px-4">
          <User {...user} />
        </li>
      ))}
      <li class="p-4 font-medium text-md text-info">
        <Link href="/suggestions">Show more</Link>
      </li>
    </ul>
  );
});
