import { component$ } from "@builder.io/qwik";
import { BirthdayOutlineIcon } from "~/icons/birthday";
import { CalendarOutlineIcon } from "~/icons/calendar";
import { EducationIcon } from "~/icons/category";
import { LinkOutlineIcon } from "~/icons/link";
import { LocationOutlineIcon } from "~/icons/location";
import { useProfile } from "./layout";

export const ProfileMetaInfo = component$(() => {
  const profileSig = useProfile();
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4">
      <div class="flex items-center opacity-70 gap-2">
        <EducationIcon />
        <span>{profileSig.value.category}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <LocationOutlineIcon />
        <span>{profileSig.value.location}</span>
      </div>
      <a
        target="_blank"
        href={profileSig.value.link}
        class="flex items-center opacity-70 gap-2 hover:link"
      >
        <LinkOutlineIcon />
        <span>{profileSig.value.link}</span>
      </a>
      <div class="flex items-center opacity-70 gap-2">
        <BirthdayOutlineIcon />
        <span>{profileSig.value.birthday}</span>
      </div>
      <div class="flex items-center opacity-70 gap-2">
        <CalendarOutlineIcon />
        <span>{profileSig.value.createdAt}</span>
      </div>
    </div>
  );
});
