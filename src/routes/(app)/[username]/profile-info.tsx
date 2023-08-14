import { component$ } from "@builder.io/qwik";
import { useProfile } from "./layout";

export const ProfileInfo = component$(() => {
  const profileSig = useProfile();
  return (
    <div class="mt-4">
      <h3 class="text-xl font-bold ">{profileSig.value.name}</h3>
      <p class="opacity-70">{profileSig.value.username}</p>
      <p class="mt-4">{profileSig.value.bio}</p>
    </div>
  );
});
