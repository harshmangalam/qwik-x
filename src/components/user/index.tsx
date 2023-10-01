import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { FollowUnfollow } from "./follow";
import type { UserType } from "~/types";
import { Avatar } from "../ui/avatar";

type Props = UserType & { showBio?: boolean };
export const User = component$((props: Props) => {
  const {
    avatar,
    name,
    username,
    profile,
    isFollowing,
    id,
    showBio = false,
  } = props;
  return (
    <div class="flex gap-4 rounded-none">
      <div class="flex-none">
        <Link href={`/${username}/`}>
          <Avatar src={avatar.url} circle />
        </Link>
      </div>
      <div class="flex-1">
        <div class="flex justify-between">
          <div>
            <div class="font-bold">
              <Link class="link link-hover" href={`/${username}/`}>
                {name}
              </Link>
            </div>
            <Link
              class="link link-hover leading-4 text-sm opacity-80"
              href={`/${username}/`}
            >
              @{username}
            </Link>
          </div>
          <FollowUnfollow otherUserId={id} isFollowing={isFollowing} />
        </div>
        {showBio && <p class="mt-2">{profile?.bio}</p>}
      </div>
    </div>
  );
});
