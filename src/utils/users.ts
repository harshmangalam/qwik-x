import {
  RequestEventAction,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { eq, not, or } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewUser, users } from "~/database/schema";
import type { AuthUser } from "~/types";
import { alreadyFollow } from "./follow";
import { fetchCurrentUser } from "./auth";
async function findUserByUsername(username: string) {
  return db.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.username, username);
    },
  });
}
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
async function isUsernameExists(username: string | null) {
  if (!username) return false;
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
      theme: true,
    },
  });
}
async function fetchUsersSuggestion({ sharedMap }: RequestEventLoader) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) return [];
  const users = await db.query.users.findMany({
    limit: 6,
    where(fields, { eq }) {
      return not(eq(fields.id, user.id));
    },
    columns: {
      id: true,
      username: true,
      name: true,
      avatar: true,
    },
  });

  const results = [];

  for (const otherUser of users) {
    const isFollowing = await alreadyFollow(user.id, otherUser.id);
    results.push({
      ...otherUser,
      isFollowing,
    });
  }
  return results;
}

async function fetchAllUserSuggestions({ sharedMap }: RequestEventLoader) {
  const user = sharedMap.get("user");
  const users = await db.query.users.findMany({
    where(fields, { eq }) {
      return not(eq(fields.id, user?.id));
    },
    columns: {
      id: true,
      username: true,
      name: true,
      avatar: true,
    },
  });

  const results = [];

  for (const otherUser of users) {
    const isFollowing = await alreadyFollow(user.id, otherUser.id);
    results.push({
      ...otherUser,
      isFollowing,
    });
  }
  return results;
}

async function handleUpdateUserTheme(
  theme: string,
  requestEvent: RequestEventAction
) {
  const user = fetchCurrentUser(requestEvent);
  await updateUser(user.id, {
    theme: {
      colorScheme: theme,
    },
  });
  throw requestEvent.redirect(307, requestEvent.url.pathname);
}
export {
  createUser,
  isEmailExists,
  isUsernameExists,
  findUserForLogin,
  updateUser,
  findUserById,
  findUserForAuthorization,
  fetchUsersSuggestion,
  findUserByUsername,
  fetchAllUserSuggestions,
  handleUpdateUserTheme,
};
