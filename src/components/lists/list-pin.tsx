import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useTogglePin } from "~/routes/(app)/lists/layout";
import { Button } from "../ui/button";
import { PinOutlineIcon } from "~/icons";

export const ListPin = component$(({ listId }: { listId: number }) => {
  const actionSig = useTogglePin();

  return (
    <Form action={actionSig}>
      <input type="hidden" name="listId" value={listId} />
      <Button loading={actionSig.isRunning} circle colorScheme="btn-ghost">
        <PinOutlineIcon />
      </Button>
    </Form>
  );
});
