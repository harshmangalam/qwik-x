import { component$ } from "@builder.io/qwik";
import { BirthdayOutlineIcon } from "~/icons/birthday";
import { CalendarOutlineIcon } from "~/icons/calendar";
import { EducationIcon } from "~/icons/category";
import { LinkOutlineIcon } from "~/icons/link";
import { LocationOutlineIcon } from "~/icons/location";

export const ProfileInfo = component$(() => {
  const data = {
    category: "Education",
    location: "Bhagalpur",
    link: "github.com/harshmangalam",
    birthday: "Born December 22, 2002",
    createdAt: "Joined February 2021",
  };

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      <div class="flex items-center opacity-70 gap-2">
        <EducationIcon />
        <span>{data.category}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <LocationOutlineIcon />
        <span>{data.location}</span>
      </div>
      <a
        target="_blank"
        href={data.link}
        class="flex items-center opacity-70 gap-2 hover:link"
      >
        <LinkOutlineIcon />
        <span>{data.link}</span>
      </a>
      <div class="flex items-center opacity-70 gap-2">
        <BirthdayOutlineIcon />
        <span>{data.birthday}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <CalendarOutlineIcon />
        <span>{data.createdAt}</span>
      </div>
    </div>
  );
});
