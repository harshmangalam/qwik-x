import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <div class="hero min-h-screen bg-base-100">
        <div class="hero-content text-center">
          <div class="max-w-md flex flex-col gap-2">
            <h1 class="text-9xl font-bold">OOPs!</h1>
            <h2 class="text-3xl opacity-80"> Page not Found</h2>
            <p class="py-6 opacity-60">
              Sorry, the page you are trying to access does not exist. Try the
              ones below.
            </p>
            <div class="flex flex-wrap items-center gap-4 justify-center">
              <Link href="/" class="btn btn-link">
                Home
              </Link>
              <Link href="/login" class="btn btn-link">
                Log in
              </Link>
              <Link href="/signup" class="btn btn-link">
                Sign up
              </Link>
              <Link href="/explore" class="btn btn-link">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
