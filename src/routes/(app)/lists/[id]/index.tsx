import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { handleFetchList } from "~/utils/lists";
import { Avatar } from "~/components/ui/avatar";

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
      <div class="w-full h-48 bg-primary-content bg-[url(https://images.unsplash.com/photo-1695456527397-0b9e1c79fe96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60)] bg-center bg-no-repeat aspect-video"></div>

      <div class="flex flex-col gap-2 items-center mt-4">
        <h3 class="font-bold text-xl">{listSig.value.name}</h3>
        <p class="text-center opacity-80">{listSig.value.description}</p>
        <div class="flex items-center flex-wrap gap-2">
          <Avatar
            circle
            size="sm"
            src={(listSig.value.owner.avatar as any)?.url}
          />
          <Link
            class="font-bold link link-hover"
            href={`/${listSig.value.owner.username}`}
          >
            {listSig.value.owner.name}
          </Link>
          <Link
            class="link link-hover opacity-60"
            href={`/${listSig.value.owner.username}`}
          >
            @{listSig.value.owner.username}
          </Link>
        </div>
      </div>
      <div class="divider"></div>
    </div>
  );
});
