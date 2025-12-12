import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import UserInitializer from "@/components/UserInitializer";
import ClientWrapper2 from "@/components/ClientWrapper2";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieToken = (await cookies()).get("token")?.value;
  const session = await decrypt(cookieToken);
  if (
    !session ||
    typeof session.email !== "string" ||
    typeof session.role !== "string"
  ) {
    redirect("/login");
  }
  return (
    <UserInitializer data={{ email: session.email, role: session.role }}>
      <ClientWrapper2>{children}</ClientWrapper2>
    </UserInitializer>
  );
};

export default layout;
