import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const useThemes = () => {
  const theme = useSignal("");

  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    const html = document.querySelector("html");
    const currentTheme = html?.getAttribute("data-theme");
    if (currentTheme) {
      theme.value = currentTheme;
    }
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
