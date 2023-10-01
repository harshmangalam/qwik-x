import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { User } from "~/components/user";
import { handleFetchListMembers } from "~/utils/lists";

export const useMembers = routeLoader$(async (requestEvent) => {
  return handleFetchListMembers(requestEvent);
});
export default component$(() => {
  const membersSig = useMembers();
  const locSig = useLocation();
  return (
    <div>
      <PageHeader
        backHref={`/lists/${locSig.params.id}`}
        title="List members"
      />
      <div class="px-4 flex flex-col gap-4">
        {membersSig.value.map((user) => (
          <User {...user} key={user.id} showBio />
        ))}
      </div>
    </div>
  );
});
