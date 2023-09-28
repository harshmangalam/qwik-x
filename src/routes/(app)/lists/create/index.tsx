import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";
import { handleCreateList, handleFetchMembersSuggestion } from "~/utils/lists";

export const useCreateList = routeAction$(
  async (formData, requestEvent) => {
    return handleCreateList(formData, requestEvent);
  },
  zod$((z) => ({
    name: z
      .string()
      .max(25, "Title length must be less than 25 characters")
      .nonempty("Title must not be empty"),
    description: z
      .string()
      .max(100, "Description must be less that 100 characters")
      .optional(),

    isPrivate: z.string().optional(),
  }))
);

export const useMembersSuggestion = routeLoader$(async () => {
  return handleFetchMembersSuggestion();
});
export default component$(() => {
  const actionSig = useCreateList();
  return (
    <div>
      <PageHeader backHref="/lists/" title="Create a new List" />
      <div class="px-4 py-4">
        <article class="card shadow">
          <div class="card-body">
            <Form action={actionSig}>
              <TextInput
                error={actionSig.value?.fieldErrors?.name}
                value={actionSig.formData?.get("name") ?? ""}
                name="name"
                id="name"
                label="Name"
                maxLength={25}
              />
              <Textarea
                name="description"
                id="description"
                label="Description"
                error={actionSig.value?.fieldErrors?.description}
                value={(actionSig.formData?.get("description") ?? "") as string}
                maxLength={100}
              />

              <div class="form-control my-2">
                <label class="label cursor-pointer">
                  <div class="label-text flex flex-col">
                    <span>Make private</span>
                    <span class="opacity-60 text-sm">
                      When you make a List private, only you can see it.
                    </span>
                  </div>
                  <input name="isPrivate" type="checkbox" class="checkbox" />
                </label>
              </div>
              <div>
                <Button
                  loading={actionSig.isRunning}
                  type="submit"
                  colorScheme="btn-primary"
                >
                  Create
                </Button>
              </div>
            </Form>
          </div>
        </article>
      </div>
    </div>
  );
});
