import { component$ } from "@builder.io/qwik";
import { useProfile } from "./layout";

export const ProfileImage = component$(() => {
  const profileSig = useProfile();
  return (
    <section
      class={`h-52 w-full relative bg-[url('${profileSig.value.cover}')] bg-no-repeat bg-cover bg-center`}
    >
      <div class="absolute -bottom-16 left-6">
        <div class="avatar">
          <div class="w-36 rounded-full ring ring-base-100 ring-offset-2">
            <img src={profileSig.value.avatar} width={144} height={144} />
          </div>
        </div>
      </div>
    </section>
  );
});
