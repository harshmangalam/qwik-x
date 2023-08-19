import { component$, useSignal } from "@builder.io/qwik";
import { PostForm } from "./post-form";

export const CreatePost = component$(() => {
  const dialogSig = useSignal<HTMLDialogElement | undefined>();
  return (
    <>
      <button
        class="btn btn-primary btn-md btn-block"
        onClick$={() => dialogSig.value?.showModal()}
      >
        Post
      </button>
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
