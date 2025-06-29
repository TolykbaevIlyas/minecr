"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import InputForm from "@/shared/ui/InputForm";
import User from "@/shared/assets/User";
import Button from "@/shared/ui/Button";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
  repassword: string;
};
const RegisterPage = () => {
  const router = useRouter();
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("register", data);
    router.push("/login");
  };
  return (
    <section className="flex min-h-[calc(100vh-201px)] w-full flex-col items-center justify-center px-[24px]">
      <h1 className="text-accent text-3xl mb-[40px]">Регистрация</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] flex flex-col items-center gap-[20px]">
          <InputForm name="nickname" placeholder="nickname" required prefix={<User />} />
          <InputForm name="email" placeholder="email" required prefix={<User />} />
          <InputForm name="password" placeholder="password" required prefix={<User />} />
          <InputForm name="repassword" placeholder="repassword" required prefix={<User />} />
          <Button name="Зарегистрироваться" type="submit" className="max-w-[190px] " />
        </form>
      </FormProvider>
    </section>
  );
};

export default RegisterPage;
