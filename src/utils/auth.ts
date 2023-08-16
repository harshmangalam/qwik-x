import {
  type RequestEvent,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { type NewUser } from "~/database/schema";
import { comparePassword, generateProfileImage, hashPassword } from "./hash";
import {
  createUser,
  findUserForAuthorization,
  findUserForLogin,
  isEmailExists,
  isUsernameExists,
  updateUser,
} from "./users";
import { createProfile } from "./profile";
import { signToken, verifyToken } from "./jwt";
import type { LoginSchema } from "~/types";

async function handleSignup(
  { email, name, password, username }: NewUser,
  { fail, redirect }: RequestEventAction
) {
  // verify email duplication
  const duplicateEmail = await isEmailExists(email);
  if (duplicateEmail)
    return fail(400, {
      error: "Email address already in use",
    });

  // verify username duplication
  const duplicateUsername = await isUsernameExists(username);
  if (duplicateUsername)
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
    avatar: {
      url: avatarUrl,
    },
    online: false,
  });

  // create new user profile and save in db
  await createProfile({
    userId: newUser.id,
  });
  throw redirect(302, "/login");
}

async function handleLogin(
  { password, username }: LoginSchema,
  { fail, cookie, redirect }: RequestEventAction
) {
  // check user exists
  const user = await findUserForLogin(username);
  if (!user)
    return fail(400, {
      error: "Invalid credentials",
    });

  // verify user password
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch)
    return fail(400, {
      error: "Invalid credentials",
    });

  // set online status to active
  await updateUser(user.id, {
    online: true,
  });

  // generate jwt token
  const accessToken = await signToken({ userId: user.id });
  const now = new Date();
  const expiration = new Date(now.getTime() + 2 * 3600000);
  cookie.set("accessToken", accessToken, {
    path: "/",
    expires: expiration,
  });
  throw redirect(302, "/");
}

async function handleTokenVerification({
  cookie,
  error,
  sharedMap,
}: RequestEvent) {
  const token = await cookie.get("accessToken");
  if (token?.value) {
    const userId = await verifyToken(token.value);
    if (!userId) {
      cookie.delete("accessToken");
      throw error(401, "Unauthenticated");
    }
    const user = await findUserForAuthorization(userId);
    if (!user) {
      cookie.delete("accessToken");
      throw error(401, "Unauthenticated");
    }
    sharedMap.set("user", user);
  }
}

export { handleSignup, handleLogin, handleTokenVerification };
