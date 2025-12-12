import ClientWrapper from "@/components/ClientWrapper";
import "@/app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digital Hub",
  description: "Project Management Application",
  manifest: "/manifest.json",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
