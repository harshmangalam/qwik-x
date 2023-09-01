import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "../ui/button";

export const CreatePost = component$(() => {
  const dialogSig = useSignal<HTMLDialogElement | undefined>();
  return (
    <>
      <Button
        fullWidth
        roundedFull
        colorScheme="btn-primary"
        onClick$={() => dialogSig.value?.showModal()}
      >
        Post
      </Button>
      <dialog ref={dialogSig} class="modal">
        <div class="modal-box"></div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});
