import { component$ } from "@builder.io/qwik";
import { LoginWithGithub } from "./login-with-github";
import { LogoIcon } from "~/icons/logo";

export default component$(() => {
  return (
    <div>
      <article class="card card-bordered shadow max-w-md mx-auto w-full">
        <div class="card-body">
          <div class="mb-6">
            <div>
              <LogoIcon />
            </div>
            <h2 class="text-3xl font-bold text-center">Sign in to X</h2>
          </div>
          <LoginWithGithub />
        </div>
      </article>
    </div>
  );
});
