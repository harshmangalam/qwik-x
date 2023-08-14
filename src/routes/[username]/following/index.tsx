import { component$ } from "@builder.io/qwik";
import { User } from "~/components/user";

export default component$(() => {
  return (
    <div class="menu p-0">
      {[...new Array(10)].map((_, i) => (
        <User key={i} />
      ))}
    </div>
  );
});
