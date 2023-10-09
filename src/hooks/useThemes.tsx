import { useSignal } from "@builder.io/qwik";

export const useThemes = () => {
  const theme = useSignal("");

  return {
    theme,
  };
};
