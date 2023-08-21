import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PostCard } from "~/components/post/post-card";
import { fetchProfilePostsLikes } from "~/utils/posts";

export const usePosts = routeLoader$(async (requestEvent) => {
  return fetchProfilePostsLikes(requestEvent);
});
export default component$(() => {
  const postSig = usePosts();
  return (
    <div>
      <div class="grid grid-cols-1 gap-4 divide-y">
        {postSig.value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
});
