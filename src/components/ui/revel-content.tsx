"use client"
/* eslint-disable prefer-const */
import { cn } from "@/lib/utils"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { Button } from "./button"

interface RevealContentProps {
  defaultHeight: number
  className?: string
  buttonText?: string
}

export default function RevealContent({
  defaultHeight,
  className,
  buttonText,
  children,
}: PropsWithChildren<RevealContentProps>) {
  let [showContent, setShowContent] = useState(false)
  let revealEl = useRef<HTMLDivElement>(null!)
  let revealChildEl = useRef<HTMLDivElement>(null!)

  function handleRevealContent() {
    if (revealEl.current.scrollHeight > defaultHeight) {
      // set timeout need to show btn feedback
      setTimeout(() => {
        setShowContent(!showContent)
      }, 500)
    }
  }

  useEffect(() => {
    if (revealChildEl.current.scrollHeight <= defaultHeight) {
      setShowContent(true)
    }
  }, [setShowContent, defaultHeight])

  return (
    <div className={className}>
      <div
        ref={revealEl}
        style={{ height: !showContent ? `${defaultHeight}px` : "auto" }}
        className={cn(!showContent && "overflow-hidden")}
      >
        <div ref={revealChildEl}>{children}</div>
      </div>
      {!showContent && (
        <div className="before:content-[' '] relative from-primary pt-3 before:absolute before:-top-6 before:block before:h-6 before:w-full before:bg-gradient-to-t">
          <Button
            variant="ghost"
            className="relative !p-0 !font-bold leading-6"
            onClick={() => handleRevealContent()}
          >
            {buttonText}
            <span className="absolute bottom-0 left-0 block w-full border-t border-border md:border"></span>
          </Button>
        </div>
      )}
    </div>
  )
}
