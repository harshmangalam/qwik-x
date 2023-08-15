import { component$ } from "@builder.io/qwik";

type Props = {
  text: string;
  status: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
};
export const Alert = component$((props: Props) => {
  const { text, status = "alert-info" } = props;
  return (
    <div class={["alert", status]}>
      <span>{text}</span>
    </div>
  );
});
