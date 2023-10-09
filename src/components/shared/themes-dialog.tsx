import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "../ui/button";
import { ThemeIcon } from "~/icons";
import { Form } from "@builder.io/qwik-city";
import { PostCard } from "../post/post-card";
import { useThemes } from "~/hooks/useThemes";
import { themeVariants } from "~/config";
type Props = {
  small?: boolean;
  showText?: boolean;
};

export const ThemesDialog = component$((props: Props) => {
  const { theme, updateTheme } = useThemes();
  const { showText = true, small = false } = props;
  const dialogSig = useSignal<HTMLDialogElement | undefined>();

  return (
    <>
      <Button
        fullWidth={!small}
        roundedFull
        circle={!showText}
        colorScheme="btn-ghost"
        onClick$={() => dialogSig.value?.showModal()}
        btnClass={"justify-start"}
      >
        <span>
          <ThemeIcon />
        </span>
        {showText && <span>Customize Themes</span>}
      </Button>
      <dialog ref={dialogSig} class="modal">
        <div class="modal-box">
          <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold text-2xl">Customize your view</h3>
            <p class="opacity-80 max-w-sm text-center w-full mx-auto">
              These settings affect all the qwik-X accounts on this browser.
            </p>
            <PostCard
              compact
              disabled
              author={{
                avatar: {
                  url: "https://avatars.githubusercontent.com/u/57381638?v=4",
                },
                id: 1,
                name: "Harsh Mangalam",
                username: "harshmangalam",
              }}
              createdAt="1 months"
              id={1}
              text={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid totam architecto rem aut veritatis tene"
              }
            />
          </div>

          <Form
            onSubmitCompleted$={() => {
              dialogSig.value?.close();
            }}
            class="mt-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themeVariants.map((t) => (
                <div
                  key={t}
                  class="form-control border rounded-md border-base-300 "
                >
                  <label class="label cursor-pointer px-4 py-3">
                    <span class="label-text">{t.toUpperCase()}</span>
                    <input
                      type="radio"
                      name={"theme"}
                      class="radio"
                      checked={theme.value === t}
                      value={t}
                      onChange$={(e) => updateTheme(e.target.value)}
                    />
                  </label>
                </div>
              ))}
            </div>
            <div class="flex justify-center mt-4">
              <Button
                roundedFull
                size="btn-sm"
                type="submit"
                colorScheme="btn-primary"
              >
                Done
              </Button>
            </div>
          </Form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});
