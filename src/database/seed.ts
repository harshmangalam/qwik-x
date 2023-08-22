import { generateProfileImage, hashPassword } from "~/utils/hash";
import { db } from "./connection";
import { users, profile } from "./schema";

async function createSeedUsers(n: number) {
  for (let i = 1; i <= n; i++) {
    const email = `user${i}@gmail.com`;
    const password = `123456`;
    db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          name: `User ${i}`,
          email,
          avatar: {
            url: await generateProfileImage(email),
          },
          password: await hashPassword(password),
          username: `user${i}`,
        })
        .returning();

      await tx.insert(profile).values({
        userId: user.id,
        bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dignissimos nulla perferendis velit corporis fuga quis",
        category: "Science & Technology",
        dob: new Date(2000, 7, 22),
        cover: `https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=710&q=80`,
        link: "https://dev.to/harshmangalam",
        location: "Bhagalpur,Bihar",
      });
    });
  }
}

export { createSeedUsers };
