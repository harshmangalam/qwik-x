import { component$ } from "@builder.io/qwik";
import { LoginWithGithub } from "./login-with-github";

export default component$(() => {
  return (
    <div>
      <article class="card card-bordered shadow max-w-xs w-full">
        <div class="card-body">
          <LoginWithGithub />
        </div>
      </article>
    </div>
  );
});
