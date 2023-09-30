import { component$ } from "@builder.io/qwik";
import { Svg } from "~/components/ui/svg";

export const PlusIcon = component$(() => (
  <Svg>
    <g>
      <path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path>
    </g>
  </Svg>
));
