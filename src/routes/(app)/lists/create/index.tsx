import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";

export default component$(() => {
  return (
    <div>
      <PageHeader title="Create a new List" />
      <div class="px-4 py-4">
        <article class="card shadow">
          <div class="card-body">
            <Form>
              <TextInput name="name" id="name" label="Name" />
              <Textarea
                name="description"
                id="description"
                label="Description"
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
                <Button type="submit" colorScheme="btn-primary">
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
