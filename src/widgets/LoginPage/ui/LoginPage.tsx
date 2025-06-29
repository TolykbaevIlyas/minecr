"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import InputForm from "@/shared/ui/InputForm";
import User from "@/shared/assets/User";
import Button from "@/shared/ui/Button";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("login", data);
    router.push("/");
  };
  return (
    <section className="flex min-h-[calc(100vh-201px)] w-full flex-col items-center justify-center px-[24px]">
      <h1 className="text-accent text-3xl mb-[40px]">Вход</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] flex flex-col items-center gap-[20px]">
          <InputForm name="email" placeholder="email" required prefix={<User />} />
          <InputForm name="password" placeholder="password" required prefix={<User />} />
          <Button name="Войти" type="submit" className="max-w-[98px]" />
        </form>
      </FormProvider>
    </section>
  );
};

export default LoginPage;
