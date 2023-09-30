import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useFollowing } from "~/routes/(app)/lists/layout";
import { Button } from "../ui/button";
import { PlusIcon } from "~/icons";

export const Following = component$(
  ({ listId, isFollowing }: { listId: number; isFollowing?: boolean }) => {
    const actionSig = useFollowing();

    return (
      <Form action={actionSig}>
        <input type="hidden" name="listId" value={listId} />
        <Button
          size="btn-sm"
          outline={!isFollowing}
          loading={actionSig.isRunning}
          circle
          colorScheme="btn-neutral"
        >
          <PlusIcon />
        </Button>
      </Form>
    );
  }
);
