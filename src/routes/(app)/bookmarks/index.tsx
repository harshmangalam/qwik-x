import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PostCard } from "~/components/post/post-card";
import { fetchBookmarkedPosts } from "~/utils/bookmarks";

export const useBookmarks = routeLoader$((requestEvent) => {
  return fetchBookmarkedPosts(requestEvent);
});
export default component$(() => {
  const postsSig = useBookmarks();
  return (
    <div>
      <div class="grid grid-cols-1 divide-y">
        {postsSig.value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Bookmarks",
};
