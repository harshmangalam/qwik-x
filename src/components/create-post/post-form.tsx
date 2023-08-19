import { component$ } from "@builder.io/qwik";
import { Visibility } from "./visibility";
import { ReplyPrivacy } from "./reply-privacy";
import {
  EmojiOutlineIcon,
  GifOutlineIcon,
  ImageOutlineIcon,
} from "~/icons/media";

export const PostForm = component$(() => {
  return (
    <article class="card">
      <div class="card-body p-0">
        <div class="flex gap-3">
          <div class="flex-none">
            <div class="avatar">
              <div class="w-16 rounded-full">
                <img
                  width={64}
                  height={64}
                  src="https://avatars.githubusercontent.com/u/57381638?v=4"
                />
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-4">
            <Visibility />
            <textarea
              class="textarea textarea-lg focus:outline-transparent p-0"
              placeholder="What is happening ?"
              rows={6}
              autoFocus
            />
          </div>
        </div>
        <ReplyPrivacy />
        <div class="divider my-2"></div>
        <div class="card-actions flex justify-between gap-4 items-center">
          <div class="flex items-center gap-2">
            <button type="button" class="btn btn-sm btn-ghost btn-circle">
              <ImageOutlineIcon />
            </button>
            <button type="button" class="btn btn-sm btn-ghost btn-circle">
              <GifOutlineIcon />
            </button>
            <button type="button" class="btn btn-sm btn-ghost btn-circle">
              <EmojiOutlineIcon />
            </button>
          </div>
          <div>
            <button class="btn btn-primary btn-block">Post</button>
          </div>
        </div>
      </div>
    </article>
  );
});
