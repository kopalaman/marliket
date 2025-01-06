"use client"

import Link from "next/link"
import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Routes } from "@/config/routes"

interface AuthWrapperProps {
  children: React.ReactNode
  headerTitle: string
  headerDescription: string
  showTerms?: boolean
  isSubmitting?: boolean
  redirectText?: string
  redirectLinkText?: string
  redirectLinkView: "LOGIN_VIEW" | "REGISTER_VIEW"
  handleRedirectLinkClick: () => void
  isSocialAuthSubmitting?: boolean
}

const VendorAuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  headerTitle,
  headerDescription,
  showTerms = true,
  isSubmitting = false,
  redirectText,
  redirectLinkText,
  redirectLinkView,
  handleRedirectLinkClick,
}) => {
  return (
    <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
      <Card>
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {headerTitle}
          </h2>
          <CardDescription>
            <p className="text-sm text-muted-foreground">{headerDescription}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
          <div className="my-5 space-y-4">
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
              <p className="px-8 text-center text-sm text-muted-foreground">
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
        </CardContent>
      </Card>
    </div>
  )
}

export default VendorAuthWrapper
