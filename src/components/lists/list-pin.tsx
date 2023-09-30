import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useTogglePin } from "~/routes/(app)/lists/layout";
import { Button } from "../ui/button";
import { PinOutlineIcon } from "~/icons";
import { PinIcon } from "~/icons/pin";

export const ListPin = component$(
  ({ listId, pinned }: { listId: number; pinned?: boolean }) => {
    const actionSig = useTogglePin();

    return (
      <Form action={actionSig}>
        <input type="hidden" name="listId" value={listId} />
        <Button
          size="btn-sm"
          btnClass={"text-primary"}
          loading={actionSig.isRunning}
          circle
          colorScheme="btn-ghost"
        >
          {pinned ? <PinIcon /> : <PinOutlineIcon />}
        </Button>
      </Form>
    );
  }
);
