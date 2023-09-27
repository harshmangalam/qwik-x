import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ListsComponent } from "~/components/lists/list";
import { PageHeader } from "~/components/page-header";
import { CreateListIcon } from "~/icons/list";

export default component$(() => {
  return (
    <div>
      <PageHeader
        title="Lists"
        end={[
          <Link
            href="/lists/create/"
            key={"create-list"}
            class="btn btn-sm btn-circle btn-ghost"
          >
            <CreateListIcon />
          </Link>,
        ]}
      />

      {/* pinned lists  */}
      <ListsComponent title="Your Lists" />
      <div class="divider"></div>
      <ListsComponent title="Discover new Lists" />
    </div>
  );
});
