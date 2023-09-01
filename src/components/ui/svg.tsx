import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
  svgClass?: string;
  stroke: string;
} & QwikIntrinsicElements["svg"];
export const Svg = component$((props: Props) => {
  const {
    height = 24,
    width = 24,
    viewBox = "0 0 24 24",
    fill = "currentColor",
    svgClass = "",
    ...rest
  } = props;
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      width={width}
      height={height}
      fill={fill}
      class={[svgClass]}
      {...rest}
    >
      <Slot />
    </svg>
  );
});
