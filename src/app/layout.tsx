import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { axiosClient } from "@/shared/api/axios";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axiosClient.interceptors.request.use((cfg) => {
    const token = cookies().get("token")?.value;
    cfg.headers["Authorization"] = `Bearer ${token}`;
    return cfg;
  });

  return (
    <html lang="en">
      <body className={cn(montserrat.className, "antialiased")}>
        <main>{children}</main>
      </body>
    </html>
  );
}