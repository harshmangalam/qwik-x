import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "../ui/button";
import { PostForm } from "./post-form";
import { PlusIcon } from "~/icons";

type Props = {
  small?: boolean;
  showText?: boolean;
};

export const CreatePost = component$((props: Props) => {
  const { showText = true, small = false } = props;
  const dialogSig = useSignal<HTMLDialogElement | undefined>();
  return (
    <>
      <Button
        fullWidth={!small}
        roundedFull
        circle={!showText}
        colorScheme="btn-primary"
        onClick$={() => dialogSig.value?.showModal()}
      >
        <span class="md:hidden">
          <PlusIcon />
        </span>
        {showText && <span>Post</span>}
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
