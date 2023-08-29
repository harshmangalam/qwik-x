import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button } from "../ui/button";

export const ReplyForm = component$(() => {
  return (
    <div class="flex-1 flex flex-col gap-2">
      <Form>
        <textarea
          rows={3}
          class="textarea textarea-bordered w-full placeholder:text-lg text-lg"
          placeholder="Post your reply!"
        />
        <div class="flex items-center justify-end">
          <Button type="submit" roundedFull colorScheme="btn-primary">
            Reply
          </Button>
        </div>
      </Form>
    </div>
  );
});
