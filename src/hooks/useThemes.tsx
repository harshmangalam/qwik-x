import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useCurrentUser } from "~/routes/(app)/layout";

export const useThemes = () => {
  const currentUser = useCurrentUser();
  const theme = useSignal("");
  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    const html = document.querySelector("html");
    const currentTheme = html?.getAttribute("data-theme");
    if (currentTheme) {
      theme.value = currentTheme;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => currentUser.value);
    const html = document.querySelector("html");
    const value = currentUser.value?.theme as any;
    const colorScheme = value?.colorScheme;
    html?.setAttribute("data-theme", colorScheme);
    theme.value = colorScheme;
  });

  const updateTheme = $((value: string) => {
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", value);
    theme.value = value;
  });
  return {
    theme,
    updateTheme,
  };
};
