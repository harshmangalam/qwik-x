import { component$ } from "@builder.io/qwik";
import { LogoIcon } from "~/icons/logo";
import { Form, Link } from "@builder.io/qwik-city";
import { TextInput } from "~/components/ui/text-input";
import { Button } from "~/components/ui/button";

export default component$(() => {
  return (
    <div class="min-h-screen grid place-items-center">
      <article class="card card-bordered shadow max-w-md mx-auto w-full">
        <div class="card-body">
          <div class="mb-6 flex flex-col items-center gap-4">
            <Link href="/">
              <LogoIcon />
            </Link>
            <h2 class="text-3xl font-bold text-center">Join qwik-X today</h2>
          </div>
          <Form>
            <TextInput label="Name" id="name" name="name" />
            <TextInput label="Email" id="email" name="email" />
            <TextInput label="Username" id="username" name="username" />
            <TextInput label="Password" id="password" name="password" />
            <div class="mt-4">
              <Button colorScheme="btn-primary" fullWidth>
                Sign up
              </Button>
            </div>
          </Form>

          <div class="mt-4 text-center">
            <span class="opacity-80">Have an account already </span>
            <Link class="link font-medium opacity-100" href="/signup">
              Log in
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
});
