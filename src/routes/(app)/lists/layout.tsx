import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { CreateListIcon } from "~/icons/list";

export default component$(() => {
  return (
    <div>
      <PageHeader
        title="Lists"
        end={[
          <Link
            key={"create-list"}
            href="/lists/create"
            class="btn btn-ghost btn-circle btn-sm"
          >
            <CreateListIcon />
          </Link>,
        ]}
      />
      <Slot />
    </div>
  );
});
