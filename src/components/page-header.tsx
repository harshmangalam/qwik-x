import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ArrowLeftIcon } from "~/icons/arrow";

type Props = {
  showBackArrow?: boolean;
  backHref?: string;
  title: string;
  subtitle?: string;
  end?: any[];
};
export const PageHeader = component$((props: Props) => {
  const { showBackArrow = true, backHref = "/", title, end, subtitle } = props;
  return (
    <header class="px-4 py-3 sticky top-0  bg-opacity-40 z-10 backdrop-blur">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          {showBackArrow && (
            <Link href={backHref} class="btn btn-ghost btn-circle btn-sm">
              <ArrowLeftIcon />
            </Link>
          )}
          <div>
            <h2 class="text-xl font-bold">{title}</h2>
            {subtitle && <p class="opacity-80 text-sm">{subtitle}</p>}
          </div>
        </div>
        {end?.map((el, i) => (
          <div key={i} class="flex items-center gap-2">
            {el}
          </div>
        ))}
      </div>
      <Slot />
    </header>
  );
});
