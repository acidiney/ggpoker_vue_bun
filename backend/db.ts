import { randomUUIDv7 } from "bun";
import slugify from "slugify";

type Common = {
  id?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export type Referred = Common & {
  percentage: number;
  username: string;
};

export type User = Common & {
  username: string;
  nickname: string;
  email: string;
  root_percentage: number;
  referred: Referred[];
};

const db: Map<string, Map<string, User>> = new Map();

db.set("users", new Map());

const checkUser = (username: string) => {
  return db.get("users")?.has(username);
};

export const addUser = (payload: User) => {
  if (checkUser(payload.username)) {
    return false;
  }

  payload.id = randomUUIDv7();
  payload.created_at = new Date();
  payload.updated_at = new Date();
  payload.username = slugify(payload.nickname);
  payload.referred = payload.referred?.map((r) => ({
    id: randomUUIDv7(),
    username: r.username,
    percentage: r.percentage / 100,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
  }));

  db.get("users")!.set(payload.username, payload);

  return true;
};

export const getUsers = () => {
  const usersMap = db.get("users");
  if (!usersMap) return [];
  return Array.from(usersMap.values()).map((u) => ({
    ...u,
    root_percentage: u.root_percentage * 100,
    referred: u.referred?.map((r) => ({
      ...r,
      percentage: r.percentage * 100,
    })),
  }));
};

export const updateUserAction = (
  username: string,
  updatedUserPayload: Partial<User>,
) => {
  const usersMap = db.get("users");
  if (!usersMap || !checkUser(username)) return false;

  const user = usersMap.get(username);
  if (!user) return false;

  if (updatedUserPayload.email) {
    user.email = updatedUserPayload.email;
  }

  if (updatedUserPayload.nickname) {
    user.nickname = updatedUserPayload.nickname;
  }

  if (updatedUserPayload.root_percentage) {
    user.root_percentage = updatedUserPayload.root_percentage;
  }

  if (updatedUserPayload.referred?.length) {
    user.referred = updatedUserPayload.referred?.map((r) => ({
      id: r.id || randomUUIDv7(),
      username: r.username,
      percentage: r.percentage / 100,
      created_at: r.created_at || new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    }));
  }

  user.updated_at = new Date();
  usersMap.set(username, user);

  return true;
};
