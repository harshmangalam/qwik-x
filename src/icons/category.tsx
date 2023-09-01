import { component$ } from "@builder.io/qwik";
import { Svg } from "~/components/ui/svg";

export const EducationIcon = component$(() => {
  return (
    <Svg fill="none" stroke="currentColor" stroke-width="2">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 6h.008v.008H6V6z"
      ></path>
    </Svg>
  );
});
