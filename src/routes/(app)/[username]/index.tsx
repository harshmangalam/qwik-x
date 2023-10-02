import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PostCard } from "~/components/post/post-card";
import { fetchProfilePosts } from "~/utils/profile";

export const usePosts = routeLoader$(async (requestEvent) => {
  return fetchProfilePosts(requestEvent);
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

export const head: DocumentHead = {
  title: "Profile",
};
