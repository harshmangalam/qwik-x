import { eq } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewList, lists } from "~/database/schema/lists";

const createList = async (list: NewList) => {
  const result = await db.insert(lists).values(list).returning();
  return result[0];
};

const fetchMyLists = async (ownerId: number) => {
  const data = await db.query.lists.findMany({
    where: eq(lists.ownerId, ownerId),
    with: {
      owner: {
        columns: {
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return data;
};
export { createList, fetchMyLists };
