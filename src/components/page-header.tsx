import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Logo } from "../components/shared/logo";
import { ArrowLeftIcon } from "~/icons/arrow";
import { ThemesDialog } from "./shared/themes-dialog";
import { useCurrentUser } from "~/routes/(app)/layout";

type Props = {
  showBackArrow?: boolean;
  backHref?: string;
  title: string;
  subtitle?: string;
  moreOptions?: any;
  links?: { name: string; href: string; icon?: any }[];
};
export const PageHeader = component$((props: Props) => {
  const {
    showBackArrow = true,
    backHref = "/",
    title,
    moreOptions,
    subtitle,
    links = [],
  } = props;

  const currentUser = useCurrentUser();
  return (
    <nav class="sticky top-0 h-10 z-10 backdrop-blur navbar bg-base-100/70 border-b-2 border-b-gray-600">
      <div class="navbar-start">
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
      </div>
      <div>
        <Logo height="h-10" width="w-10" />
      </div>
      <div class="navbar-end">
        {links.map(({ href, name, icon }) => (
          <Link
            key={name}
            title={name}
            href={href}
            class="btn btn-circle btn-ghost btn-md"
          >
            {icon}
          </Link>
        ))}
        {moreOptions}
        <div class="md:hidden">
          {currentUser.value && <ThemesDialog small showText={false} />}
        </div>
      </div>

      <Slot />
    </nav>
  );
});
