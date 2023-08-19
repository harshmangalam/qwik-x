import { component$ } from "@builder.io/qwik";

import { Link } from "@builder.io/qwik-city";
import { User } from "../user";
import { useCurrentUser, useUserSuggesions } from "~/routes/(app)/layout";
import { AuthCard } from "./auth-card";

export const MetaSidebar = component$(() => {
  const userSig = useCurrentUser();
  const usersSig = useUserSuggesions();

  return (
    <aside class="pl-12 py-6 sticky top-0">
      {!userSig.value && <AuthCard />}
      {userSig.value && (
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
      )}
    </aside>
  );
});
