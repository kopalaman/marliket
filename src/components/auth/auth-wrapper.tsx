"use client"

import { LoaderPinwheel } from "lucide-react"
import Link from "next/link"
import React from "react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Routes } from "@/config/routes"
import { useModal } from "@/lib/hooks/use-modal"
import { signUpWithGoogle } from "@/lib/server/oauth"

interface AuthWrapperProps {
  children: React.ReactNode
  headerDescription: string
  showSocial?: boolean
  showTerms?: boolean
  isSubmitting?: boolean
  redirectText?: string
  redirectLinkText?: string
  redirectLinkView?: "LOGIN_VIEW" | "REGISTER_VIEW"
  onSocialAuth?: (provider: string) => void
  isSocialAuthSubmitting?: boolean
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  headerDescription,
  showSocial = true,
  showTerms = true,
  isSubmitting = false,
  redirectText,
  redirectLinkText,
  redirectLinkView = "LOGIN_VIEW",
}) => {
  const { openModal } = useModal()

  const handleRedirectLinkClick = () => {
    openModal(redirectLinkView)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-5 px-4 pt-20 sm:w-[395px] md:px-0 md:pt-0">
      <p className="text-center text-sm text-muted-foreground">
        {headerDescription}
      </p>

      {children}

      {showSocial && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() => signUpWithGoogle()}
          >
            {isSubmitting ? (
              <LoaderPinwheel className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <FcGoogle className="mr-2 h-5 w-5" />
            )}{" "}
            Google
          </Button>
        </>
      )}

      {/* Redirect Link */}
      <p className="text-center text-sm text-muted-foreground">
        {redirectText}{" "}
        <button
          type="button"
          className="underline underline-offset-4 hover:text-primary"
          onClick={handleRedirectLinkClick}
        >
          {redirectLinkText}
        </button>
      </p>

      {showTerms && (
        <p className="px-8 pb-4 text-center text-sm text-muted-foreground">
          By proceeding, you agree to our{" "}
          <Link
            href={Routes.terms}
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={Routes.privacy}
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </div>
  )
}

export default AuthWrapper
