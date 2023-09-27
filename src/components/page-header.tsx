import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ArrowLeftIcon } from "~/icons/arrow";

type Props = {
  backHref?: string;
  title: string;
  subtitle?: string;
  end?: any[];
};
export const PageHeader = component$((props: Props) => {
  const { backHref = "/", title, end, subtitle } = props;
  return (
    <header class="px-2 py-2">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <Link href={backHref} class="btn btn-ghost btn-circle btn-sm">
            <ArrowLeftIcon />
          </Link>
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
