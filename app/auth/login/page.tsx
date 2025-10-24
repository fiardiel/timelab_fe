"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/LoadingSpinner";
import { loginSchema, LoginForm } from "@/types/auth/login";
import { handleLoginFormSubmit } from "@/lib/auth/login";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null)
    const response = await handleLoginFormSubmit(data)
    if (response.ok) {
      reset()
      router.push("/")
      return
    }
    setError(response.message)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-transparent flex flex-col p-6 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-center">Login</p>
          <p className="text-3xl mt-1">
            TIME<span className="text-blue-500">SPACE</span>
          </p>
        </div>
        <form
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-5"
        >
          <div className="flex flex-col">
            <Input
              className="border-none bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black"
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </span>
            )}

            <Input
              className="border-none bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}

            <Button
              data-testid="login-button"
              className="mt-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner className="h-5 w-5" />
              ) : (
                "Login"
              )}
            </Button>

            {error && (
              <p className="text-red-500 font-semibold text-sm self-center mt-2">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage
