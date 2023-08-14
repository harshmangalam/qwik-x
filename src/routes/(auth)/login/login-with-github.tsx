import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { GithubIcon } from "~/icons/socials";

export const LoginWithGithub = component$(() => {
  return (
    <div>
      <Button fullWidth colorScheme="btn-neutral">
        <GithubIcon />
        Login with Github
      </Button>
    </div>
  );
});
