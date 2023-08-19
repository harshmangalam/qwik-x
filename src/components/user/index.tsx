import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { FollowUnfollow } from "./follow";

type Props = {
  showBio?: boolean;
  isFollowing?: boolean;
};
export const User = component$<Props>((props) => {
  const { showBio = false, isFollowing = false } = props;
  return (
    <li>
      <Link href="/" class="rounded-none w-full block">
        <div class="flex gap-4">
          <div class="flex-none">
            <div class="avatar flex-none">
              <div class="w-11 h-11 rounded-full">
                <img
                  src="https://pbs.twimg.com/profile_images/1650752290641547264/sb1RZ0Dj_400x400.jpg"
                  width={44}
                  height={44}
                />
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <div>
                <div class="font-bold">Khushboo Verma</div>
                <div class="leading-4 text-sm opacity-60">@khushbooverma_</div>
              </div>
              <FollowUnfollow isFollowing={isFollowing} />
            </div>
            {showBio && (
              <p class="mt-2">
                Revolutionising how video is built. Create, edit and distribute
                thousands of bespoke, data driven videos in minutes with
                Shotstack.
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
});
