import { component$ } from "@builder.io/qwik";
import { useFollowUnfollow } from "~/routes/(app)/layout";
import { Button } from "../ui/button";

type Props = {
  isFollowing: boolean;
};
export const FollowUnfollow = component$((props: Props) => {
  const { isFollowing } = props;
  const actionSig = useFollowUnfollow();
  return (
    <Button
      onClick$={() => actionSig.submit({ userId: 3 })}
      type="submit"
      preventdefault:click
      btnClass={"rounded-full"}
      colorScheme={isFollowing ? "btn-error" : "btn-neutral"}
      size="btn-sm"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
});
