import { Slot, component$ } from "@builder.io/qwik";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
  svgClass?: string;
};
export const Svg = component$<Props>((props) => {
  const {
    height = 24,
    width = 24,
    viewBox = "0 0 24 24",
    fill = "currentColor",
    svgClass = "",
  } = props;
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      width={width}
      height={height}
      fill={fill}
      class={[svgClass]}
    >
      <Slot />
    </svg>
  );
});
