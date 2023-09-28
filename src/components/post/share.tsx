import { component$ } from "@builder.io/qwik";
import { ShareOutlineIcon } from "~/icons/share";
import { Button } from "../ui/button";

export const Share = component$(
  ({ isLarge = false }: { isLarge?: boolean }) => {
    return (
      <div class="group">
        <Button
          preventdefault:click
          onClick$={() => {}}
          colorScheme="btn-ghost"
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
          btnClass={"group-hover:btn-accent"}
        >
          <ShareOutlineIcon />
        </Button>
      </div>
    );
  }
);
