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
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader } from "@/shared/ui/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/shadcn/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff } from "lucide-react";
import { useMediaQuery } from "@mui/system";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
    verificationCode: z
      .string()
      .min(6, { message: "Confirmation code is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ShowPasswordType = {
  password: boolean;
  confirmPassword: boolean;
};

export const SignUpForm = () => {
  const [step, setStep] = useState(2);
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
  const [showPassword, setShowPassword] = useState<ShowPasswordType>({
    password: false,
    confirmPassword: false,
  });
  const isMobile = useMediaQuery("(min-width: 768px)");

  const handleShowPassword = (key: keyof ShowPasswordType) => {
    setShowPassword((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

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
            <div className="relative w-full">
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormMessage className="absolute bottom-1 left-6" />
                    <FormControl>
                      <Input
                        variant="custom"
                        type={showPassword.password ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
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
            <div className="relative w-full">
              <FormField
                control={form.control}
                name={"confirmPassword"}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormMessage className="absolute bottom-1 left-6" />
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
            <div className="flex items-center gap-10">
              <Button
                type="button"
                variant="outline"
                size={isMobile ? "xl" : "default"}
                className="font-semibold"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                size={isMobile ? "xl" : "default"}
                className="font-semibold"
              >
                {isLoading ? <Loader className="text-2xl" /> : "Confirm"}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
