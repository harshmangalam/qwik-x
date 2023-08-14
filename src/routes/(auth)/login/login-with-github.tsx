import { component$ } from "@builder.io/qwik";
import { GithubIcon } from "~/icons/socials";

export const LoginWithGithub = component$(() => {
  return (
    <div>
      <button class="btn btn-block">
        <GithubIcon />
        Login with Github
      </button>
    </div>
  );
});
