/* eslint-disable @typescript-eslint/no-unused-vars */
// LoginForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/forms/custom-field-form"

import { useLogin, useRegister } from "@/data/auth"

import { ApiError } from "@/lib/error"
import { useModal } from "@/lib/hooks/use-modal"
import {
  loginSchema,
  registerFormSchema,
  registerSchema,
} from "@/lib/validation"
import { FormFieldType } from "@/types/form"
import { Checkbox } from "../ui/checkbox"
import { SubmitButton } from "../ui/forms/form-submit-button"
import { Label } from "../ui/label"
import AuthWrapper from "./auth-wrapper"
import FormError from "./form-error"

const LoginForm: React.FC = () => {
  const { closeModal } = useModal()
  const { mutateAsync: loginMutate, isPending, error, isSuccess } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginMutate({ json: data })
      closeModal()
    } catch (err) {
      // Handle errors
      // console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Enter your email"
          disabled={isPending}
          props={{ type: "email" }}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Enter your password"
          disabled={isPending}
          props={{ type: "password" }}
        />
        <div className="flex items-center justify-between space-x-5">
          <div className="flex items-center space-x-2">
            <Checkbox id="login-remember-me" />
            <Label
              htmlFor="login-remember-me"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>
          <button
            type="button"
            className="text-sm font-medium leading-none text-muted-foreground"
          >
            Forgot password?
          </button>
        </div>
        {error instanceof ApiError && <FormError message={error?.message} />}

        <SubmitButton isSubmitting={isPending} className="w-full text-center">
          {isPending ? "Logging in..." : "Login"}
        </SubmitButton>
      </form>
    </Form>
  )
}

// RegisterForm.tsx
const RegisterForm: React.FC = () => {
  const { closeModal } = useModal()
  const { mutateAsync: registerMutate, isPending, error } = useRegister()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerMutate({ json: data })
      closeModal()
    } catch (err) {
      // Handle errors
      // console.error(err)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Name"
          placeholder="Enter your name"
          disabled={isPending}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Enter your email"
          disabled={isPending}
          props={{ type: "email" }}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Enter your password"
          disabled={isPending}
          props={{ type: "password" }}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          disabled={isPending}
          props={{ type: "password" }}
        />
        {error instanceof ApiError && <FormError message={error?.message} />}
        <SubmitButton isSubmitting={isPending} className="w-full text-center">
          {isPending ? "Registering..." : "Register"}
        </SubmitButton>
      </form>
    </Form>
  )
}

// RenderAuth.tsx
const RenderAuth: React.FC = () => {
  const { view } = useModal()

  return (
    <AuthWrapper
      headerDescription={
        view === "REGISTER_VIEW"
          ? "Enter your details to create a new account"
          : "Enter your credentials to sign in to your account"
      }
      redirectText={
        view === "REGISTER_VIEW"
          ? "Already have an account?"
          : "Don't have an account?"
      }
      redirectLinkText={view === "REGISTER_VIEW" ? "Login" : "Sign up"}
      redirectLinkView={
        view === "REGISTER_VIEW" ? "LOGIN_VIEW" : "REGISTER_VIEW"
      }
    >
      {view === "REGISTER_VIEW" ? <RegisterForm /> : <LoginForm />}
    </AuthWrapper>
  )
}

export default RenderAuth
