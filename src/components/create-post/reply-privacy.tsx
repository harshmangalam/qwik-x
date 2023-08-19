import { component$ } from "@builder.io/qwik";

export const ReplyPrivacy = component$(() => {
  const options = ["Everyone", "Following", "Follower", "Mention"];
  return (
    <select
      name="replyPrivacy"
      class="select select-bordered w-full rounded-full select-sm max-w-fit"
    >
      <option disabled selected>
        Who can reply ?
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});
