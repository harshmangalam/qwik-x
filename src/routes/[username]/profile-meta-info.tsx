import { component$ } from "@builder.io/qwik";
import { BirthdayOutlineIcon } from "~/icons/birthday";
import { CalendarOutlineIcon } from "~/icons/calendar";
import { EducationIcon } from "~/icons/category";
import { LinkOutlineIcon } from "~/icons/link";
import { LocationOutlineIcon } from "~/icons/location";

type Props = {
  category: string;
  location: string;
  link: string;
  birthday: string;
  createdAt: string;
};
export const ProfileMetaInfo = component$<Props>((props) => {
  const { birthday, category, createdAt, link, location } = props;
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4">
      <div class="flex items-center opacity-70 gap-2">
        <EducationIcon />
        <span>{category}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <LocationOutlineIcon />
        <span>{location}</span>
      </div>
      <a
        target="_blank"
        href={link}
        class="flex items-center opacity-70 gap-2 hover:link"
      >
        <LinkOutlineIcon />
        <span>{link}</span>
      </a>
      <div class="flex items-center opacity-70 gap-2">
        <BirthdayOutlineIcon />
        <span>{birthday}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <CalendarOutlineIcon />
        <span>{createdAt}</span>
      </div>
    </div>
  );
});
