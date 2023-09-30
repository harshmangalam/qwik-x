import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { useFollowing } from ".";
import { Form } from "@builder.io/qwik-city";

type Props = {
  isFollowing: boolean;
  listId: number;
};

export const Following = component$((props: Props) => {
  const { isFollowing, listId } = props;
  const actionSig = useFollowing();
  const hover = useSignal(false);
  return (
    <Form action={actionSig}>
      <input type="hidden" name="listId" value={listId} />
      <Button
        size="btn-sm"
        type="submit"
        colorScheme={isFollowing ? "btn-error" : "btn-neutral"}
        loading={actionSig.isRunning}
        outline={isFollowing}
        roundedFull
        onMouseEnter$={() => (hover.value = true)}
        onMouseLeave$={() => (hover.value = false)}
      >
        {isFollowing ? (hover.value ? "Unfollow" : "Following") : "Follow"}
      </Button>
    </Form>
  );
});
