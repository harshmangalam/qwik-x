import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { handleFetchList } from "~/utils/lists";

export const useList = routeLoader$(async (requestEvent) => {
  return handleFetchList(requestEvent);
});
export default component$(() => {
  const listSig = useList();
  return (
    <div>
      <PageHeader
        title={listSig.value.name}
        backHref="/lists/"
        subtitle={`@${listSig.value.owner.username}`}
      />
    </div>
  );
});
