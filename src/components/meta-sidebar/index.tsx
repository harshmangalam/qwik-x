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
        <ul class="menu bg-base-200 w-full rounded-box p-0">
          <li class="menu-title text-xl text-base-content py-4">
            Who to follow
          </li>
          {usersSig.value.map((user) => (
            <User {...user} key={user.id} />
          ))}
          <li>
            <Link
              href="/suggestions"
              class="rounded-t-none py-4 font-medium text-md rounded-b-box"
            >
              Show more
            </Link>
          </li>
        </ul>
      )}
    </aside>
  );
});
