import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Bookmark } from "~/components/post/bookmark";
import { Comment } from "~/components/post/comment";
import { Like } from "~/components/post/like";
import { Share } from "~/components/post/share";
import { ArrowLeftIcon } from "~/icons/arrow";

export default component$(() => {
  return (
    <div>
      <header class="flex items-center gap-3 px-4 h-14 sticky bg-base-100/80 top-0 backdrop-blur">
        <Link href="/" class="btn btn-ghost btn-circle btn-sm">
          <ArrowLeftIcon />
        </Link>
        <h2 class="font-bold text-lg">Posts</h2>
      </header>

      {/* post autor section  */}

      <section class="flex items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full">
              <img
                width={40}
                height={40}
                src="https://avatars.githubusercontent.com/u/57381638?v=4"
              />
            </div>
          </div>
          <div class="flex flex-col gap-0">
            <h3 class="font-semibold text-lg">Harsh Mangalam</h3>
            <span class="opacity-70 leading-4">@harshmangalam</span>
          </div>
        </div>
      </section>

      {/* post info section  */}
      <section class="mt-4 px-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, id?
        </p>

        <div class="text-sm mt-4">
          <span class="opacity-70"> 9:20 PM · Aug 28, 2023 · </span>
          <span class="font-bold">61</span>
          <span class="opacity-70">Views</span>
        </div>
        <div class="divider my-2"></div>
        <div class="flex items-center gap-4">
          <Link href="" class="text-sm group">
            <span class="font-bold">5 </span>
            <span class="opacity-70 group-hover:underline"> Reposts</span>
          </Link>
          <Link href="" class="text-sm group">
            <span class="font-bold">100 </span>
            <span class="opacity-70 group-hover:underline"> Likes</span>
          </Link>
          <div class="text-sm">
            <span class="font-bold">10 </span>
            <span class="opacity-70"> Bookmarks</span>
          </div>
        </div>
        <div class="divider my-2"></div>
        <div class="card-actions justify-between pt-3">
          <Comment postId={1} />
          <Like postId={1} isLiked={true} />
          <Bookmark postId={1} />
          <Share />
        </div>
        <div class="divider my-2"></div>
      </section>
    </div>
  );
});
