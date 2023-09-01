import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const AuthCard = component$(() => {
  return (
    <article class="card card-bordered shadow">
      <div class="card-body p-4">
        <div class="card-title">New to qwik-X ?</div>
        <p class="opacity-60">
          Sign up now to get your own personalized timeline!
        </p>
        <div class="flex flex-col gap-3">
          <Link href="/signup/" class="btn btn-neutral  btn-block">
            Create account
          </Link>
        </div>
      </div>
    </article>
  );
});
