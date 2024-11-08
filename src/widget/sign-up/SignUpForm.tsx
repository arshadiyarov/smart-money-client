"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/shadcn/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";
import { authService } from "@/entities/auth/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "@/shared/ui/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/shadcn/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address to continue" }),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    verificationCode: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verificationCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = values;

    if (step === 1) {
      const res = await authService.signUp(values);

      setStep(2);
      toast.info(res.message);
    }

    if (step === 2) {
      const res = await authService.signUp(payload);

      if (res.token) {
        Cookies.set("token", res.token);
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5"
      >
        {/* Step 1 */}
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name={"firstName"}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormMessage className="absolute bottom-1 left-6" />
                  <FormControl>
                    <Input
                      variant="custom"
                      placeholder="Firstname"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"lastName"}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormMessage className="absolute bottom-1 left-6" />
                  <FormControl>
                    <Input variant="custom" placeholder="Lastname" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormMessage className="absolute bottom-1 left-6" />
                  <FormControl>
                    <Input variant="custom" placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormMessage className="absolute bottom-1 left-6" />
                  <FormControl>
                    <Input
                      variant="custom"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"confirmPassword"}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormMessage className="absolute bottom-1 left-6" />
                  <FormControl>
                    <Input
                      variant="custom"
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              size="xl"
              className="font-semibold"
            >
              {isLoading ? <Loader className="text-2xl" /> : "Next"}
            </Button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name={"verificationCode"}
              render={({ field }) => (
                <FormItem className="w-full relative flex justify-center">
                  <FormMessage className="absolute bottom-1 left-6" />
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
            <div className="flex items-center gap-10">
              <Button
                type="button"
                variant="outline"
                size="xl"
                className="font-semibold"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" size="xl" className="font-semibold">
                {isLoading ? <Loader className="text-2xl" /> : "Confirm"}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
