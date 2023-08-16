import { component$ } from "@builder.io/qwik";
import { LoginWithGithub } from "./login-with-github";
import { LogoIcon } from "~/icons/logo";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { TextInput } from "~/components/ui/text-input";
import { Button } from "~/components/ui/button";
import { handleLogin } from "~/utils/auth";
import { Alert } from "~/components/ui/alert";

export const useLogin = routeAction$(
  async (formData, requestEvent) => {
    return handleLogin(formData, requestEvent);
  },
  zod$({
    username: z.string().nonempty("Enter username or email address"),
    password: z.string().nonempty("Enter value for password field"),
  })
);
export default component$(() => {
  const loginSig = useLogin();
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
          {loginSig.value?.error && (
            <Alert text={loginSig.value.error} status="alert-error" />
          )}
          <Form action={loginSig}>
            <TextInput
              label="Email or Username"
              id="username"
              name="username"
              value={loginSig.formData?.get("username") ?? ""}
              error={loginSig.value?.fieldErrors?.username?.[0]}
            />
            <TextInput
              label="Password"
              id="password"
              name="password"
              error={loginSig.value?.fieldErrors?.password?.[0]}
            />
            <div class="mt-4">
              <Button
                loading={loginSig.isRunning}
                colorScheme="btn-primary"
                fullWidth
              >
                Log in
              </Button>
            </div>
          </Form>
          <div class="divider">OR</div>
          <LoginWithGithub />
          <div class="mt-4 text-center">
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
