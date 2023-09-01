import { component$ } from "@builder.io/qwik";
import { useCurrentUser } from "~/routes/(app)/layout";
import { AuthCard } from "./auth-card";
import { UserSuggestions } from "./users-suggestion";

export const RightSidebar = component$(() => {
  const userSig = useCurrentUser();

  return (
    <aside class="pl-12 py-6 sticky top-0">
      {userSig.value ? <UserSuggestions /> : <AuthCard />}
    </aside>
  );
});
