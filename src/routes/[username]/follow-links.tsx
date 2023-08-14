import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useProfile } from "./layout";

export const FollowLinks = component$(() => {
  const profileSig = useProfile();
  return (
    <div class="mt-4 flex items-center gap-6">
      <Link href={`/${profileSig.value.username}/following`} class="hover:link">
        <span class="font-bold">170 </span>
        <span class="opacity-70">Following</span>
      </Link>
      <Link href={`/${profileSig.value.username}/followers`} class="hover:link">
        <span class="font-bold">19 </span>
        <span class="opacity-70">Followers</span>
      </Link>
    </div>
  );
});
