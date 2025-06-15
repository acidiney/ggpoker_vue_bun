import { Hono } from "hono";
import { cors } from "hono/cors";

import { type User, addUser, getUsers, updateUserAction } from "./db";

type AddUserPayload = Omit<
  User,
  "id" | "created_at" | "updated_at" | "deleted_at" | "referred"
>;
type UpdateUserPayload = Partial<
  Pick<User, "email" | "nickname" | "root_percentage">
>;

type ApiResponse<T = undefined> = {
  message: string;
  data?: T;
};

const usersRoute = new Hono();

usersRoute.get("/", () => {
  const users = getUsers();
  const response: ApiResponse<User[]> = {
    message: "Users retrieved successfully",
    data: users,
  };
  return Response.json(response, { status: 200 });
});

usersRoute.post("/", async (c) => {
  try {
    const payload = (await c.req.json()) as AddUserPayload;

    if (
      !payload.username ||
      !payload.nickname ||
      !payload.email ||
      payload.root_percentage === undefined
    ) {
      const response: ApiResponse = {
        message: "Missing required fields",
      };
      return Response.json(response, { status: 400 });
    }

    const addUserActionResult = addUser(payload as User);

    if (!addUserActionResult) {
      const response: ApiResponse = {
        message: "User already exists",
      };
      return Response.json(response, { status: 422 });
    }

    const response: ApiResponse = {
      message: "User added successfully",
    };
    return Response.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      message: "Invalid request payload",
    };
    return Response.json(response, { status: 400 });
  }
});

usersRoute.put("/:username", async (c) => {
  const { username } = c.req.param();

  if (!username) {
    const response: ApiResponse = {
      message: "Username parameter is required",
    };
    return Response.json(response, { status: 400 });
  }

  try {
    const updatePayload = (await c.req.json()) as UpdateUserPayload;

    if (Object.keys(updatePayload).length === 0) {
      const response: ApiResponse = {
        message: "No fields to update",
      };
      return Response.json(response, { status: 400 });
    }

    const updateUserActionResult = updateUserAction(username, updatePayload);

    if (!updateUserActionResult) {
      const response: ApiResponse = {
        message: "User not found",
      };
      return Response.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      message: "User updated successfully",
    };
    return Response.json(response, { status: 200 });
  } catch (error) {
    const response: ApiResponse = {
      message: "Invalid request payload",
    };
    return Response.json(response, { status: 400 });
  }
});

const app = new Hono();

app.use("*", cors());
app.route("/users", usersRoute);

export default app;
