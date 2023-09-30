import { component$ } from "@builder.io/qwik";
import { Svg } from "~/components/ui/svg";

export const PlusIcon = component$(() => (
  <Svg>
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 6v12m6-6H6"
    ></path>
  </Svg>
));
