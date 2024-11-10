"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/shadcn/input-otp";
import { Loader } from "@/shared/ui/Loader";
import { authService } from "@/entities/auth/auth.service";

const baseSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address to continue" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  verificationCode: z.string().optional(),
});

const signInSchemaWithStep = (currentStep: number) => {
  if (currentStep === 1) {
    return baseSchema;
  }

  if (currentStep === 2) {
    return baseSchema
      .extend({
        confirmPassword: z
          .string()
          .min(8, { message: "Confirm password is required" }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
  }

  if (currentStep === 3) {
    return baseSchema.extend({
      verificationCode: z
        .string()
        .min(6, { message: "Verification code is required" }),
    });
  }

  return baseSchema;
};

type ResetPasswordType = {
  password: boolean;
  confirmPassword: boolean;
};

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<ResetPasswordType>({
    password: false,
    confirmPassword: false,
  });
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<ReturnType<typeof signInSchemaWithStep>>>({
    resolver: zodResolver(signInSchemaWithStep(step)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
  });

  const handleShowPassword = (key: keyof ResetPasswordType) => {
    setShowPassword((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const onSubmit = async (
    values: z.infer<ReturnType<typeof signInSchemaWithStep>>,
  ) => {
    setIsLoading(true);

    if (step === 1) {
      const { email, password } = values;
      const res = await authService.signIn({ email, password });

      if (res.token) {
        Cookies.set("token", res.token);
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    }

    if (step === 2) {
      const { email, password, verificationCode } = values;
      const res = await authService.forgotPassword({
        email,
        password,
        verificationCode: verificationCode ? verificationCode : "",
      });

      toast.info(res.first);
      setStep(3);
    }

    if (step === 3) {
      const { email, password, verificationCode } = values;
      const res = await authService.forgotPassword({
        email,
        password,
        verificationCode: verificationCode ? verificationCode : "",
      });

      toast.info(res.first);
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
      form.setValue("verificationCode", "");
      setStep(1);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8"
      >
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input variant="custom" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-1">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          variant="custom"
                          type={showPassword.password ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword.password ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <Button
                variant="link"
                size="sm"
                type="button"
                className="ml-5 w-fit"
                onClick={() => setStep(2)}
              >
                Forgot password
              </Button>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline"
              size="xl"
              className="font-semibold"
            >
              {isLoading ? <Loader /> : "Login"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input variant="custom" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-1">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          variant="custom"
                          type={showPassword.password ? "text" : "password"}
                          placeholder="New password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword.password ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          variant="custom"
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleShowPassword("confirmPassword")}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword.confirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => setStep(1)}
                className="font-semibold"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                size="xl"
                className="font-semibold"
              >
                {isLoading ? <Loader /> : "Next"}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="w-full relative flex justify-center">
                  <FormMessage className="absolute -top-6 left-1/2 -translate-x-1/2 text-nowrap" />
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-5">
              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => setStep(2)}
                className="font-semibold"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                size="xl"
                className="font-semibold"
              >
                {isLoading ? <Loader /> : "Reset"}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
