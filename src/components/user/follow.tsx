import { component$, useSignal } from "@builder.io/qwik";
import { useFollowUnfollow } from "~/routes/(app)/layout";
import { Button } from "../ui/button";

type Props = {
  isFollowing: boolean;
  otherUserId: number;
};
export const FollowUnfollow = component$((props: Props) => {
  const { isFollowing, otherUserId } = props;
  const actionSig = useFollowUnfollow();
  const hover = useSignal(false);
  return (
    <Button
      onClick$={() => actionSig.submit({ otherUserId })}
      type="button"
      preventdefault:click
      colorScheme={isFollowing ? "btn-error" : "btn-neutral"}
      size="btn-sm"
      loading={actionSig.isRunning}
      outline={isFollowing}
      roundedFull
      onMouseEnter$={() => (hover.value = true)}
      onMouseLeave$={() => (hover.value = false)}
    >
      {isFollowing ? (hover.value ? "Unfollow" : "Following") : "Follow"}
    </Button>
  );
});
