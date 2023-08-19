import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { eq, not, or } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewUser, users } from "~/database/schema";
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
  const alreadyFollowing = null;
  if (alreadyFollowing) {
    // handle unfollow user
  } else {
    // follow user
  }
  throw redirect(302, url.pathname);
}
async function getUserSuggestions({ sharedMap }: RequestEventLoader) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) return [];
  return db.query.users.findMany({
    limit: 6,
    where(users, { eq }) {
      return not(eq(users.id, user.id));
    },
    columns: {
      id: true,
      username: true,
      name: true,
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
  handleFollowUnfollowUser,
  getUserSuggestions,
};
