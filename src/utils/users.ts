import { eq, or } from "drizzle-orm";
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
async function findUserForLogin(username: string) {
  const data = await db.query.users.findFirst({
    where: or(eq(users.username, username), eq(users.email, username)),
  });

  return data;
}

async function updateUser(id: number, user: Partial<NewUser>) {
  const data = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning();

  return data[0];
}

async function findUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

async function findUserForAuthorization(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      name: true,
      username: true,
      id: true,
      role: true,
      avatar: true,
    },
  });
}
export {
  createUser,
  isEmailExists,
  isUsernameExists,
  findUserForLogin,
  updateUser,
  findUserById,
  findUserForAuthorization,
};
