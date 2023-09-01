import { component$ } from "@builder.io/qwik";
import { Form, routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";
import { handleFetchProfileInfo } from "~/utils/profile";

export const useFetchProfile = routeLoader$((requestEvent) => {
  return handleFetchProfileInfo(requestEvent);
});
export default component$(() => {
  const profileSig = useFetchProfile();
  return (
    <Form>
      <article class="card">
        <div class="card-body">
          <div class="card-title">Edit Profile</div>
          <Textarea
            label="Bio"
            id="bio"
            name="bio"
            value={profileSig.value.bio ?? ""}
          />
          <TextInput
            label="Location"
            id="location"
            name="location"
            value={profileSig.value.location}
          />
          <TextInput
            label="Website"
            id="website"
            name="website"
            value={profileSig.value.link}
          />
          <TextInput
            type="date"
            name="dob"
            label="Birth date"
            id="dob"
            value={profileSig.value.dob}
          />

          <div class="card-actions justify-end mt-4">
            <Button type="submit" colorScheme="btn-neutral">
              Save
            </Button>
          </div>
        </div>
      </article>
    </Form>
  );
});
