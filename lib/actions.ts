"use server";
import { redirect } from "next/navigation";
import { encrypt } from "./session";
import { cookies } from "next/headers";

const users = [
  { email: "admin@test.com", role: "admin", password: "test1234" },
  { email: "dev@test.com", role: "dev", password: "test1234" },
  { email: "pm@test.com", role: "projectManager", password: "test1234" },
];
export const login = async (email: string, password: string) => {
  const isUser = users.findIndex(
    (user) => user.email === email && user.password === password
  );
  if (isUser !== -1) {
    const cookieStore = await cookies();
    const tokenData = {
      email: users[isUser].email,
      role: users[isUser].role,
    };
    const token = await encrypt(tokenData);
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      isAuth: true,
      role: users[isUser].role,
      email: users[isUser].email,
    };
  }
  return { isAuth: false, role: null, email: null };
};

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}