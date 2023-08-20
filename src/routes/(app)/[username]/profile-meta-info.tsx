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
      {profileSig.value.profile.category && (
        <div class="flex items-center opacity-70 gap-2">
          <EducationIcon />
          <span>{profileSig.value.profile.category}</span>
        </div>
      )}
      {profileSig.value.profile.location && (
        <div class="flex items-center opacity-70 gap-2">
          <LocationOutlineIcon />
          <span>{profileSig.value.profile.location}</span>
        </div>
      )}
      {profileSig.value.profile.link && (
        <a
          target="_blank"
          href={profileSig.value.profile.link}
          class="flex items-center opacity-70 gap-2 hover:link"
        >
          <LinkOutlineIcon />
          <span>{profileSig.value.profile.link}</span>
        </a>
      )}
      {profileSig.value.profile.dob && (
        <div class="flex items-center opacity-70 gap-2">
          <BirthdayOutlineIcon />
          <span>Born {profileSig.value.profile.dob}</span>
        </div>
      )}
      <div class="flex items-center opacity-70 gap-2">
        <CalendarOutlineIcon />
        <span>Joined {profileSig.value.profile.createdAt}</span>
      </div>
    </div>
  );
});
