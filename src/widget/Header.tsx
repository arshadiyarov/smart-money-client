"use client";

import { Container } from "@/shared/ui/Container";
import Link from "next/link";
import { Logo } from "@/shared/ui/Logo";
import { Button } from "@/shared/ui/shadcn/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Header = () => {
  const token = Cookies.get("token");
  const router = useRouter();

  const handleLogout = async () => {
    Cookies.remove("token");
    // TODO server side token and not from here
    router.push("/sign-in");
  };

  return (
    <header>
      <Container>
        <div className="flex items-center justify-between py-3">
          <Link href="/public">
            <Logo />
          </Link>
          {token ? (
            <Button onClick={handleLogout} asChild>
              <Link href="/sign-in">Logout</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
