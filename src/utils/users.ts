import { type RequestEventAction } from "@builder.io/qwik-city";
import { and, eq, or } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewUser, users, followers } from "~/database/schema";
import type { AuthUser } from "~/types";

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

async function handleFollowUnfollowUser(
  { userId }: { userId: number },
  { redirect, url, sharedMap, error }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  const by = user.id;
  const alreadyFollowing = await db.query.followers.findFirst({
    where: and(eq(followers.by, by), eq(followers.to, userId)),
  });
  if (alreadyFollowing) {
    await db
      .delete(followers)
      .where(and(eq(followers.by, by), eq(followers.to, userId)));
  } else {
    await db.insert(followers).values({ by, to: userId });
  }
  throw redirect(302, url.pathname);
}
export {
  createUser,
  isEmailExists,
  isUsernameExists,
  findUserForLogin,
  updateUser,
  findUserById,
  findUserForAuthorization,
  handleFollowUnfollowUser,
};
