import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Button } from "../ui/button";
import { useCreateReply } from "~/routes/(app)/posts/[postId]";

type Props = {
  parentPostId: number;
  replyTo: string;
};

export const ReplyForm = component$((props: Props) => {
  const { parentPostId, replyTo } = props;
  const actionSig = useCreateReply();
  return (
    <div class="flex-1 flex flex-col gap-2">
      <div class="mb-0">
        <span class="opacity-60"> Replying to </span>
        <Link href={`/${replyTo}`} class="text-info hover:underline">
          @{replyTo}
        </Link>
      </div>

      <Form
        action={actionSig}
        onSubmitCompleted$={(_, form) => {
          form.reset();
        }}
      >
        <input type="hidden" name="parentPostId" value={parentPostId} />
        <textarea
          class="textarea focus:outline-none p-0 w-full placeholder:text-lg text-lg"
          placeholder="Post your reply!"
          autoFocus
          name="text"
        />
        <div class="flex items-center justify-end">
          <Button
            loading={actionSig.isRunning}
            type="submit"
            roundedFull
            colorScheme="btn-primary"
          >
            Reply
          </Button>
        </div>
      </Form>
    </div>
  );
});
