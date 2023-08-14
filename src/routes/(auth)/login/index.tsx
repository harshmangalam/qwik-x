import { component$ } from "@builder.io/qwik";
import { LoginWithGithub } from "./login-with-github";
import { LogoIcon } from "~/icons/logo";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="min-h-screen grid place-items-center">
      <article class="card card-bordered shadow max-w-md mx-auto w-full">
        <div class="card-body">
          <div class="mb-6 flex flex-col items-center gap-4">
            <Link href="/">
              <LogoIcon />
            </Link>
            <h2 class="text-3xl font-bold text-center">Sign in to qwik-X</h2>
          </div>
          <LoginWithGithub />

          <div class="mt-8 text-center">
            <span class="opacity-80">Don’t have an account? </span>
            <Link class="link font-medium opacity-100" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
});
