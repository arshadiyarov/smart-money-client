import { Card } from "@/shared/ui/shadcn/card";
import { Logo } from "@/shared/ui/Logo";
import { SignInForm } from "@/widget/sign-in/SignInForm";
import { Container } from "@/shared/ui/Container";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="bg-secondary-background min-h-screen">
      <Container>
        <div className="flex justify-between py-20 h-screen">
          <div className="w-1/2 text-white font-semibold space-y-3 hidden lg:block">
            <h1 className="text-5xl text-pretty">Welcome Back!</h1>
            <h2 className="text-2xl text-pretty">
              Please enter your credentials to access SmartMoney
            </h2>
          </div>
          <Card className="flex-1 py-20 px-4 sm:px-7 md:px-14 flex flex-col items-center justify-between gap-20">
            <Logo className="mx-auto" />
            <div className="w-full">
              <SignInForm />
            </div>
            <div className="space-x-1 text-xl">
              <span>Don&apos;t have an account?</span>
              <Link href={"/sign-up"} className="underline">
                Register
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
