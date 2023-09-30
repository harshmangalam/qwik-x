import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { and, eq, sql } from "drizzle-orm";
import { db } from "~/database/connection";
import { type NewList, lists } from "~/database/schema/lists";
import { fetchCurrentUser } from "./auth";
import {
  usersListsFollowers,
  usersListsMembers,
  usersListsPinned,
} from "~/database/schema";
import { alreadyFollow } from "./follow";

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

const handleFetchYourLists = async (requestEvent: RequestEventLoader) => {
  const user = fetchCurrentUser(requestEvent);
  const data = await db.query.lists.findMany({
    where(fields, { eq }) {
      return eq(fields.ownerId, user.id);
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
  const results = [];
  for await (const list of data) {
    results.push({
      ...list,
      hasPinned: await hasPinned(list.id, user.id),
      isMember: true,
      membersCount: await fetchListsMembersCount(list.id),
      isFollowing: await isAlreadyFollowingList(list.id, user.id),
    });
  }
  return results;
};

const handleFetchListsSuggestions = async (
  requestEvent: RequestEventLoader
) => {
  const user = fetchCurrentUser(requestEvent);
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
  const results = [];
  for await (const list of data) {
    results.push({
      ...list,
      hasPinned: false,
      isMember: await isAlreadyListMembers(list.id, user.id),
      membersCount: await fetchListsMembersCount(list.id),
      isFollowing: await isAlreadyFollowingList(list.id, user.id),
    });
  }

  return results;
};

const handleFetchList = async (requestEvent: RequestEventLoader) => {
  const listId = Number(requestEvent.params.id);
  if (!listId) throw requestEvent.redirect(307, "/lists/");
  const user = fetchCurrentUser(requestEvent);
  const data = await db.query.lists.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, listId);
    },
    with: {
      owner: true,
    },
  });

  if (!data) throw requestEvent.error(404, "Lists not found");

  return {
    ...data,
    hasPinned: await hasPinned(listId, user.id),
    isMember: await isAlreadyListMembers(listId, user.id),
    membersCount: await fetchListsMembersCount(listId),
    isFollowing: await isAlreadyFollowingList(listId, user.id),
    followersCount: await fetchListsFollowersCount(listId),
  };
};

const handleCreateList = async (
  { name, isPrivate, description, members }: any,
  requestEvent: RequestEventAction
) => {
  const user = fetchCurrentUser(requestEvent);
  const list = await createList({
    name,
    description,
    isPrivate: isPrivate === "on",
    ownerId: user.id,
  });

  const membersId = members.map(Number);
  for await (const id of membersId) {
    const isMember = await isAlreadyListMembers(list.id, id);
    if (!isMember) {
      await createUsersListsMembers(list.id, id);
    }
  }

  throw requestEvent.redirect(307, "/lists/");
};

// pin lists

const hasPinned = async (listId: number, userId: number) => {
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(usersListsPinned)
    .where(
      and(
        eq(usersListsPinned.userId, userId),
        eq(usersListsPinned.listId, listId)
      )
    );
  return data[0]?.count ? true : false;
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

  const results = [];
  for await (const { list } of data) {
    results.push({
      ...list,
      hasPinned: true,
      isMember: await isAlreadyListMembers(list.id, user.id),
      membersCount: await fetchListsMembersCount(list.id),
    });
  }

  return results;
};

// lists members

const handleFetchMembersSuggestion = async () => {
  const users = await db.query.users.findMany({
    columns: {
      name: true,
      username: true,
      avatar: true,
      id: true,
    },
  });
  return users;
};

const handleFetchListMembers = async (requestEvent: RequestEventLoader) => {
  const user = fetchCurrentUser(requestEvent);
  const listId = Number(requestEvent.params.id);

  const members = await db.query.usersListsMembers.findMany({
    where(fields, { eq }) {
      return eq(fields.listId, listId);
    },
    with: {
      user: {
        with: {
          profile: {
            columns: {
              bio: true,
            },
          },
        },
      },
    },
  });

  const results = [];
  for await (const data of members) {
    results.push({
      ...data.user,
      isFollowing: await alreadyFollow(user.id, data.userId),
    });
  }

  return results;
};

const isAlreadyListMembers = async (listId: number, userId: number) => {
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(usersListsMembers)
    .where(
      and(
        eq(usersListsMembers.userId, userId),
        eq(usersListsMembers.listId, listId)
      )
    );
  return data[0]?.count ? true : false;
};

const createUsersListsMembers = async (listId: number, userId: number) => {
  const data = await db
    .insert(usersListsMembers)
    .values({
      listId,
      userId,
    })
    .returning();

  return data[0];
};

const fetchListsMembersCount = async (listId: number) => {
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(usersListsMembers)
    .where(eq(usersListsMembers.listId, listId));
  return data[0]?.count;
};

// lists followers
const isAlreadyFollowingList = async (listId: number, userId: number) => {
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(usersListsFollowers)
    .where(
      and(
        eq(usersListsFollowers.userId, userId),
        eq(usersListsFollowers.listId, listId)
      )
    );
  return data[0]?.count ? true : false;
};

const followList = async (listId: number, userId: number) => {
  const data = await db
    .insert(usersListsFollowers)
    .values({ listId, userId })
    .returning();
  return data[0];
};
const unfollowList = async (listId: number, userId: number) => {
  const data = await db
    .delete(usersListsFollowers)
    .where(
      and(
        eq(usersListsFollowers.listId, listId),
        eq(usersListsFollowers.userId, userId)
      )
    )
    .returning();
  return data[0];
};
const handleFollowUnfollowLists = async (
  listId: string,
  requestEvent: RequestEventAction
) => {
  if (!listId) throw requestEvent.error(400, "List id is missing");
  const user = fetchCurrentUser(requestEvent);
  const isFollowing = await isAlreadyFollowingList(+listId, user.id);
  if (isFollowing) {
    // unfollow list
    await unfollowList(+listId, user.id);
  } else {
    // follow list
    await followList(+listId, user.id);
  }
};
const fetchListsFollowersCount = async (listId: number) => {
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(usersListsFollowers)
    .where(eq(usersListsFollowers.listId, listId));
  return data[0]?.count;
};

export {
  handleCreateList,
  handleFetchYourLists,
  handleFetchListsSuggestions,
  handleTogglePinLists,
  fetchListById,
  handleFetchPinnedLists,
  handleFetchList,
  handleFetchMembersSuggestion,
  handleFetchListMembers,
  handleFollowUnfollowLists,
};
