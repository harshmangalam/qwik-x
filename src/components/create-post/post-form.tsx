import { type QRL, component$, noSerialize } from "@builder.io/qwik";
import { Visibility } from "./visibility";
import { ReplyPrivacy } from "./reply-privacy";
import {
  EmojiOutlineIcon,
  GifOutlineIcon,
  ImageOutlineIcon,
} from "~/icons/media";
import { Form } from "@builder.io/qwik-city";
import { useCreatePost, useCurrentUser } from "~/routes/(app)/layout";
import { Button } from "../ui/button";

type Props = {
  onComplete$?: QRL<() => void>;
};
export const PostForm = component$((props: Props) => {
  const { onComplete$ = noSerialize(() => {}) } = props;
  const actionSig = useCreatePost();
  const currentUserSig = useCurrentUser();
  return (
    <Form
      action={actionSig}
      onSubmitCompleted$={(_, form) => {
        form.reset();
        onComplete$?.();
      }}
    >
      <article class="card">
        <div class="card-body p-0">
          <div class="flex gap-3">
            <div class="flex-none">
              <div class="avatar">
                <div class="w-16 rounded-full">
                  <img
                    width={64}
                    height={64}
                    src={currentUserSig.value?.avatar?.url}
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
                name="text"
              />
            </div>
          </div>
          <ReplyPrivacy />
          <div class="divider my-2"></div>
          {/* modified the next line by replacing class justify-end by justify-between */}
          <div class="card-actions flex justify-between">
            {/* modified next line by replacing items-center by self-center and added flex-wrap to prevent icons    */}
            <div class="flex self-center gap-2 flex-wrap:nowrap">
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
            <div class="">
              <Button
                type="submit"
                colorScheme="btn-primary"
                loading={actionSig.isRunning}
                roundedFull
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Form>
  );
});
