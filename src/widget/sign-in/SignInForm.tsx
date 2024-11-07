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

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address to continue" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const res = await authService.signIn(values);

    if (res.token) {
      Cookies.set("token", res.token);
      toast.success(res.message);
      router.push("/");
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8"
      >
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input variant="custom" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  variant="custom"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="outline"
          size="xl"
          className="font-semibold"
        >
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};
