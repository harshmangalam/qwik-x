import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewList, lists } from "~/database/schema/lists";
import { fetchCurrentUser } from "./auth";
import { usersListsPinned } from "~/database/schema";

const createList = async (list: NewList) => {
  const result = await db.insert(lists).values(list).returning();
  return result[0];
};

const fetchListById = async (listId: number) => {
  const data = await db.query.lists.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, listId);
    },
  });
  return data;
};

const hasPinned = async (listId: number, userId: number) => {
  const data = await db.query.usersListsPinned.findFirst({
    where(fields, { eq, and }) {
      return and(eq(fields.listId, listId), eq(fields.userId, userId));
    },
  });
  return data?.listId ? true : false;
};

const deletePin = async (listId: number, userId: number) => {
  await db
    .delete(usersListsPinned)
    .where(
      and(
        eq(usersListsPinned.listId, listId),
        eq(usersListsPinned.userId, userId)
      )
    );
};

const addPin = async (listId: number, userId: number) => {
  await db.insert(usersListsPinned).values({
    listId,
    userId,
  });
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

const fetchListsSuggestions = async () => {
  const data = await db.query.lists.findMany({
    where(fields, { eq }) {
      return eq(fields.isPrivate, false);
    },
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

const handleTogglePinLists = async (
  listId: number,
  requestEvent: RequestEventAction
) => {
  const currentUser = fetchCurrentUser(requestEvent);
  const pinned = await hasPinned(listId, currentUser.id);
  if (pinned) {
    // remove from pin
    await deletePin(listId, currentUser.id);
  } else {
    // add to pin
    await addPin(listId, currentUser.id);
  }

  throw requestEvent.redirect(307, "/lists/");
};

const handleFetchPinnedLists = async (requestEvent: RequestEventLoader) => {
  const user = fetchCurrentUser(requestEvent);
  const data = await db.query.usersListsPinned.findMany({
    where(fields, { eq }) {
      return eq(fields.userId, user.id);
    },
    with: {
      list: {
        with: {
          owner: true,
        },
      },
    },
  });

  return data.map((d) => d.list);
};
export {
  createList,
  fetchMyLists,
  fetchListsSuggestions,
  handleTogglePinLists,
  fetchListById,
  handleFetchPinnedLists,
};
