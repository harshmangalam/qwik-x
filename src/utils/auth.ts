import { type RequestEventAction } from "@builder.io/qwik-city";
import { eq, sql } from "drizzle-orm";
import { db } from "~/database/connection";
import { users, type NewUser } from "~/database/schema";
import { generateProfileImage, hashPassword } from "./hash";
import { createUser } from "./users";
import { createProfile } from "./profile";

async function handleSignup(
  { email, name, password, username }: NewUser,
  { fail, redirect }: RequestEventAction
) {
  // verify email duplication
  const matchEmail = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.email, email));

  if (matchEmail[0].count)
    return fail(400, {
      error: "Email address already in use",
    });

  // verify username duplication
  const matchUsername = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.username, username));

  if (matchUsername[0].count)
    return fail(400, {
      error: "Username already in use",
    });

  // generate gravtar from email
  const avatarUrl = await generateProfileImage(email);

  // generate password hash
  const hash = await hashPassword(password);

  // create new user and save in db
  const newUser = await createUser({
    email,
    name,
    username,
    password: hash,
    role: "User",
    online: false,
  });

  // create new user profile and save in db
  await createProfile({
    userId: newUser.id,
    avatar: {
      url: avatarUrl,
    },
  });
  throw redirect(302, "/login");
}

export { handleSignup };
