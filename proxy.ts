import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

function Logout(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("token");
  return response;
}
const protectedRoutes = ["/dashboard", "/projects"];
const publicRoutes = ["/login", "/signup", "/"];
export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookieToken = (await cookies()).get("token")?.value;
  const session = await decrypt(cookieToken);

  if (isProtectedRoute && !session?.email) {

    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.email &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}