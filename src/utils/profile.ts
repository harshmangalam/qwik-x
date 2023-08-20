import { type RequestEventLoader } from "@builder.io/qwik-city";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { db } from "~/database/connection";
import { profile, type NewProfile } from "~/database/schema";

async function createProfile(values: NewProfile) {
  const data = await db.insert(profile).values(values).returning();
  return data[0];
}

async function updateProfile(userId: number, values: Partial<NewProfile>) {
  const data = await db
    .update(profile)
    .set(values)
    .where(eq(profile.userId, userId))
    .returning();
  return data[0];
}

async function fetchUserProfile({ error, params }: RequestEventLoader) {
  const data = await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.username, params.username);
    },
    with: {
      profile: true,
    },
  });
  if (!data) throw error(404, "User not found");

  return {
    ...data,
    profile: {
      ...data.profile,
      createdAt: format(data.profile.createdAt, "MMMM yyyy"),
      dob: data.profile.dob ? format(data.profile.dob, "MMMM d, yyyy") : null,
    },
  };
}
export { createProfile, updateProfile, fetchUserProfile };
