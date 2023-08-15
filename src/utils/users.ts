import { eq } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewUser, users } from "~/database/schema";

async function createUser(user: NewUser) {
  const data = await db.insert(users).values(user).returning();
  return data[0];
}

async function isEmailExists(email: string) {
  const data = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: {
      email: true,
    },
  });

  if (data) return true;
  return false;
}
async function isUsernameExists(username: string) {
  const data = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      username: true,
    },
  });

  if (data) return true;
  return false;
}

export { createUser, isEmailExists, isUsernameExists };
