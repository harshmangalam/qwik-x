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

export { createProfile, updateProfile };
