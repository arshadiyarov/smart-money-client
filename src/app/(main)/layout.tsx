import { ReactNode } from "react";
import { Header } from "@/widget/Header";
import { Sidebar } from "@/widget/Sidebar";
import { Container } from "@/shared/ui/Container";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <Header />
      <Container>
        <div className="flex items-start gap-20">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </Container>
    </div>
  );
}
