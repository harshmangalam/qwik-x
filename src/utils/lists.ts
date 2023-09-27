import { db } from "~/database/connection";
import { type NewList, lists } from "~/database/schema/lists";

const createList = async (list: NewList) => {
  const result = await db.insert(lists).values(list).returning();
  return result[0];
};

export { createList };
