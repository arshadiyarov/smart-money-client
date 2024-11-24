import { Container } from "@/shared/ui/Container";
import Link from "next/link";
import { Logo } from "@/shared/ui/Logo";
import { Button } from "@/shared/ui/shadcn/button";
import { ProfileDropDown } from "@/widget/profile/ProfileDropDown";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { cookies } from "next/headers";

export const Header = () => {
  const token = cookies().get("token");

  return (
    <header>
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <Logo />
          </Link>
          <div
            className={cn("hidden items-center gap-6", {
              flex: token,
            })}
          >
            <div className="font-semibold text-xl">Welcome back, Name</div>
            <ProfileDropDown />
            <Button size="icon" className="rounded-full size-16">
              <Image
                src={"/assets/icons/bell.svg"}
                alt={"bell"}
                width={48}
                height={48}
              />
            </Button>
          </div>
          <div
            className={cn("hidden items-center gap-6", {
              flex: !token,
            })}
          >
            <Button variant="link" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
