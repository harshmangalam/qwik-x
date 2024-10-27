import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { PostCard } from "~/components/post/post-card";
import { fetchPostsFeed } from "~/utils/posts";

/**
 * Home page
 */
export const usePostFeeds = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Get current page from query params
  const limit = 10; // Set limit for posts
  return fetchPostsFeed(requestEvent, page, limit);
});

export default component$(() => {
  const currentPageSig = useSignal(1);
  const totalPagesSig = useSignal(0);
  const limit = 10;

  const postFeedsSig = usePostFeeds();

  useVisibleTask$(({ track }) => {
    track(() => postFeedsSig.value);
    totalPagesSig.value = Math.ceil(postFeedsSig.value.length / limit); // Assuming fetchPostsFeed returns total posts count
  });

  const loadMore$ = $(() => {
    if (currentPageSig.value < totalPagesSig.value) {
      currentPageSig.value += 1; // Increment the current page
      const url = new URL(window.location.href);
      url.searchParams.set("page", currentPageSig.value.toString());
      window.history.pushState({}, "", url);
      window.location.reload(); // Reload to fetch the new page data
    }
  });

  const previous$ = $(() => {
    if (currentPageSig.value > 1) {
      currentPageSig.value -= 1; // Decrement the current page
      const url = new URL(window.location.href);
      url.searchParams.set("page", currentPageSig.value.toString());
      window.history.pushState({}, "", url);
      window.location.reload(); // Reload to fetch the new page data
    }
  });

  return (
    <div>
      <PageHeader title="Home" showBackArrow={false} />
      <div class="grid grid-cols-1 divide-y">
        {postFeedsSig.value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <div class="mt-4 flex justify-center space-x-2">
        <button
          onClick$={previous$}
          class="btn"
          disabled={currentPageSig.value === 1} // Disable if on the first page
        >
          Prev Page
        </button>
        <span>
          Page {currentPageSig.value} of {totalPagesSig.value}
        </span>
        <button
          onClick$={loadMore$}
          class="btn"
          disabled={currentPageSig.value >= totalPagesSig.value} // Disable if on the last page
        >
          Next Page
        </button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Home",
};
