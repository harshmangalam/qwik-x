import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PostCard } from "~/components/post/post-card";

export default component$(() => {
  return (
    <div>
      <div class="grid grid-cols-12 divide-x">
        <section class="col-span-7">
          <div class="grid grid-cols-1 gap-4 divide-y">
            {[...new Array(10)].map((_, i) => (
              <PostCard key={i} />
            ))}
          </div>
        </section>
        <section class="col-span-5"></section>
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
