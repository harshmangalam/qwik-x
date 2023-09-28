import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { ListItem } from "~/components/lists/list-item";
import PinnedListItem from "~/components/lists/pinned-list-item";
import { PageHeader } from "~/components/page-header";
import { CreateListIcon } from "~/icons/list";

import {
  handleFetchListsSuggestions,
  handleFetchMyLists,
  handleFetchPinnedLists,
} from "~/utils/lists";

export const useMyLists = routeLoader$(async (requestEvent) => {
  const lists = await handleFetchMyLists(requestEvent);
  return lists;
});

export const useListsSuggestions = routeLoader$(async () => {
  const lists = await handleFetchListsSuggestions();
  return lists;
});

export const usePinnedLists = routeLoader$(async (requestEvent) => {
  return handleFetchPinnedLists(requestEvent);
});
export default component$(() => {
  const myListsSig = useMyLists();
  const suggestionsSig = useListsSuggestions();
  const pinnedListsSig = usePinnedLists();
  const headerLinks = [
    {
      name: "Create List",
      icon: <CreateListIcon />,
      href: "/lists/create/",
    },
  ];
  return (
    <div>
      <PageHeader title="Lists" links={headerLinks} />

      {/* pinned lists  */}
      <div class="flex flex-col gap-4 px-4">
        <h3 class="text-xl font-bold">Pinned Lists</h3>
        <ul class="flex flex-wrap gap-3">
          {pinnedListsSig.value.map((list) => (
            <PinnedListItem
              id={list.id}
              isPrivate={list.isPrivate}
              name={list.name}
              key={list.id}
            />
          ))}
        </ul>
      </div>
      <div class="divider"></div>

      {/* suggestions lists  */}
      <div class="flex flex-col gap-4 px-4">
        <h3 class="text-xl font-bold">Discover new Lists</h3>
        <ul class="flex flex-col gap-3">
          {suggestionsSig.value.map((list) => (
            <ListItem {...list} key={list.id} />
          ))}
        </ul>
      </div>
      <div class="divider"></div>

      {/* your lists  */}
      <div class="flex flex-col gap-4 px-4">
        <h3 class="text-xl font-bold">Your Lists</h3>
        <ul class="flex flex-col gap-3">
          {myListsSig.value.map((list) => (
            <ListItem {...list} key={list.id} />
          ))}
        </ul>
      </div>

      <div class="divider"></div>
    </div>
  );
});
