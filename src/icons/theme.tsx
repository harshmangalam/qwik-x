import { component$ } from "@builder.io/qwik";
import { Svg } from "~/components/ui/svg";

export const ThemeOutlineIcon = component$(() => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" svgClass="stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      ></path>
    </Svg>
  );
});

export const ThemeIcon = component$(() => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <path
      fill="currentColor"
      d="M10 3.5a6.5 6.5 0 1 1 0 13v-13ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Z"
    />
  </Svg>
));
