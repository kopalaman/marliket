"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqData = [
  {
    category: "Car Buying Guide",
    questions: [
      {
        question: "How do I find the right car?",
        answer:
          "Start by using our search filters to narrow down by price, make, model, and features. Compare different vehicles and read our expert reviews to make an informed decision.",
      },
      {
        question: "What should I check before buying?",
        answer:
          "Review the vehicle history report, verify mileage, check service history, and look for our 'Inspected' badge. We recommend test driving and inspecting the vehicle in person.",
      },
      {
        question: "How do car payments work?",
        answer:
          "You can pay securely through our platform using bank transfer, financed payments, or approved payment methods. All transactions are protected by our secure payment system.",
      },
    ],
  },
  {
    category: "Vehicle Inspections",
    questions: [
      {
        question: "What does inspection cover?",
        answer:
          "Our 150-point inspection covers mechanical condition, electrical systems, body condition, interior quality, and road test performance. A detailed report is provided to buyers.",
      },
      {
        question: "Are inspected cars better?",
        answer:
          "Inspected vehicles come with verified condition reports and our quality assurance. This gives you more confidence in the vehicle's condition and transparency in your purchase.",
      },
      {
        question: "Can I request an inspection?",
        answer:
          "Yes, you can request an inspection for any vehicle you're interested in. The inspection can be arranged before making a purchase decision.",
      },
    ],
  },
  {
    category: "Buyer Protection",
    questions: [
      {
        question: "How am I protected?",
        answer:
          "Our buyer protection program covers vehicle condition discrepancies, title issues, and major mechanical problems discovered within the coverage period.",
      },
      {
        question: "What if there's an issue?",
        answer:
          "Contact our support team immediately. We'll help resolve any issues and can assist with returns or refunds if the vehicle doesn't match its description.",
      },
      {
        question: "Is there a warranty?",
        answer:
          "Many vehicles come with remaining manufacturer warranty. We also offer optional extended warranty packages for additional peace of mind.",
      },
    ],
  },
  {
    category: "Test Drives & Collection",
    questions: [
      {
        question: "How do I arrange a test drive?",
        answer:
          "Request a test drive through the vehicle listing page. We'll coordinate with the dealer for a convenient time and location.",
      },
      {
        question: "Where do I collect the car?",
        answer:
          "Vehicles can be collected from our secure collection points or authorized dealerships. We can also arrange home delivery for your convenience.",
      },
      {
        question: "What documents do I need?",
        answer:
          "Bring your driver's license, proof of insurance, and payment confirmation. We'll handle all necessary paperwork for the transfer.",
      },
    ],
  },
]

function FAQCategory({
  category,
  questions,
}: {
  category: string
  questions: { question: string; answer: string }[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {category}
      </h3>
      <Accordion type="single" collapsible>
        {questions.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-gray-200 dark:border-gray-800"
          >
            <AccordionTrigger
              className={cn(
                "text-left text-sm font-medium",
                "text-gray-700 hover:text-gray-900",
                "dark:text-gray-300 dark:hover:text-gray-100",
                "py-4 transition-all"
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function FAQSection() {
  return (
    <div className="bg-white px-4 py-16 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about buying your next vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {faqData.map((category, index) => (
            <FAQCategory key={index} {...category} />
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a
            href="/contact"
            className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
}
