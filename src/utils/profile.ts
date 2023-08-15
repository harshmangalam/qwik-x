import { db } from "~/database/connection";
import { profile, type NewProfile } from "~/database/schema";

async function createProfile(values: NewProfile) {
  const data = await db.insert(profile).values(values).returning();
  return data[0];
}

export { createProfile };
