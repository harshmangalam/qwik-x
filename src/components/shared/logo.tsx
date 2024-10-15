import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LogoIcon } from "~/icons/logo";

type LogoProps = {
  className?: string;
  height?: string;
  width?: string;
}

export const Logo = component$(({ className = "", height = "h-14", width = "w-14"}: LogoProps) => {
  return (
    <Link class={`p-0 rounded-full btn btn-ghost ${className} ${height} ${width}`} href="/">
      <LogoIcon />
    </Link>
  );
});
