import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(5).max(40),
  email: z.string().min(5).max(40).email(),
  password: z.string().min(8).max(100),
});

export function partialUser({ user }) {
  return UserSchema.partial().safeParse(user);
}

export function completedUser({ user }) {
  return UserSchema.safeParse(user);
}
