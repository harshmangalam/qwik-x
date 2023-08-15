import { type RequestEventAction } from "@builder.io/qwik-city";
import { type NewUser } from "~/database/schema";
import { generateProfileImage, hashPassword } from "./hash";
import { createUser, isEmailExists, isUsernameExists } from "./users";
import { createProfile } from "./profile";

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
