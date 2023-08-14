import { component$ } from "@builder.io/qwik";

export const ProfileImage = component$(() => {
  return (
    <section class="h-52 w-full relative bg-[url('https://images.unsplash.com/photo-1678524493115-cc22b4789d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1537&q=80')] bg-no-repeat bg-cover bg-center">
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
  );
});
