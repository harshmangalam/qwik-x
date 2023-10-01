import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "../ui/button";
import { PostForm } from "./post-form";

type Props = {
  small?: boolean
};

export const CreatePost = component$<Props>((props) => {
  const dialogSig = useSignal<HTMLDialogElement | undefined>();
  return (
    <>
      <Button
        fullWidth={!props.small}
        roundedFull
        colorScheme="btn-primary"
        onClick$={() => dialogSig.value?.showModal()}
      >
        Post
      </Button>
      <dialog ref={dialogSig} class="modal">
        <div class="modal-box">
          <PostForm onComplete$={() => dialogSig.value?.close()} />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});
