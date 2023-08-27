import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PostCard } from "~/components/post/post-card";
import { fetchPostsFeed } from "~/utils/posts";

export const usePostFeeds = routeLoader$(async (requestEvent) => {
  return fetchPostsFeed(requestEvent);
});
export default component$(() => {
  const postFeedsSig = usePostFeeds();
  return (
    <div>
      <div class="grid grid-cols-1 divide-y">
        {postFeedsSig.value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
