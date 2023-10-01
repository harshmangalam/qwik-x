import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { PostCard } from "~/components/post/post-card";
import { fetchExplorePosts } from "~/utils/posts";

export const useExporePosts = routeLoader$(async (requestEvent) => {
  return fetchExplorePosts(requestEvent);
});
export default component$(() => {
  const postFeedsSig = useExporePosts();
  return (
    <div>
      <PageHeader title="Explore" />
      <div class="grid grid-cols-1 divide-y">
        {postFeedsSig.value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Expore",
};
