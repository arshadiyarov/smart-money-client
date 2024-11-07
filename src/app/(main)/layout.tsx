import { ReactNode } from "react";
import { Header } from "@/widget/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
