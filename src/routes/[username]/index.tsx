import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ProfileInfo } from "./profile-info";
import { useProfile } from "./layout";

export default component$(() => {
  const profileSig = useProfile();
  return (
    <div>
      {/* profile poster  */}
      <section class="h-52 relative bg-gradient-to-r from-cyan-500 to-blue-500">
        <div class="absolute -bottom-16 left-6">
          <div class="avatar">
            <div class="w-36 rounded-full ring ring-base-100 ring-offset-2">
              <img
                src="https://avatars.githubusercontent.com/u/57381638?v=4"
                width={144}
                height={144}
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-3 px-4">
        <div class="flex justify-end">
          <Link href="/settings/profile" class="btn rounded-full">
            Edit Profile
          </Link>
        </div>
        <div class="mt-4">
          <h3 class="text-xl font-bold ">Harsh Mangalam</h3>
          <p class="opacity-70">@HarshMangalam6</p>
        </div>
        <p class="mt-4">Open source developer, blogger and student</p>

        <div class="mt-4">
          <ProfileInfo />
        </div>

        <div class="mt-4 flex items-center gap-6">
          <Link
            href={`/${profileSig.value.username}/following`}
            class="hover:link"
          >
            <span class="font-bold">170 </span>
            <span class="opacity-70">Following</span>
          </Link>
          <Link
            href={`/${profileSig.value.username}/followers`}
            class="hover:link"
          >
            <span class="font-bold">19 </span>
            <span class="opacity-70">Followers</span>
          </Link>
        </div>
      </section>
    </div>
  );
});
