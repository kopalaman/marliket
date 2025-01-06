"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqData = [
  {
    category: "Buying & Selling",
    questions: [
      {
        question: "How do I start selling vehicles?",
        answer:
          "Getting started is simple: Choose your seller plan, verify your account, and create your first listing. We'll guide you through each step of the process.",
      },
      {
        question: "What are the selling fees?",
        answer:
          "Our fee structure is transparent: Free plan has 10% transaction fee, Professional plan 7%, and Enterprise plan 5%. Subscription fees are billed monthly or annually.",
      },
      {
        question: "How do I receive payments?",
        answer:
          "Payments are processed through our secure system and transferred to your registered bank account within 2-3 business days after sale completion.",
      },
    ],
  },
  {
    category: "Documentation & Verification",
    questions: [
      {
        question: "What documents do I need?",
        answer:
          "Required documents include government ID, proof of address, and vehicle documentation. Business sellers also need business registration and dealer license if applicable.",
      },
      {
        question: "How long does verification take?",
        answer:
          "Individual seller verification typically takes 24-48 hours. Business verification may take 2-3 business days. We'll notify you once verified.",
      },
    ],
  },
  {
    category: "Support & Assistance",
    questions: [
      {
        question: "What support do you offer?",
        answer:
          "We provide 24/7 email support, live chat during business hours, and priority phone support for Professional and Enterprise plans. Our help center is always available.",
      },
      {
        question: "How can I contact customer service?",
        answer:
          "You can reach our support team via live chat, email, or phone. Professional and Enterprise sellers get priority support access.",
      },
    ],
  },
  {
    category: "Vehicle Inspections",
    questions: [
      {
        question: "Are vehicles inspected before listing?",
        answer:
          "We offer an optional professional inspection service. Vehicles that pass our inspection receive an 'Inspected' badge, giving buyers additional confidence.",
      },
      {
        question: "What does the inspection cover?",
        answer:
          "Our 150-point inspection covers mechanical condition, electrical systems, body condition, interior quality, and road test performance. A detailed report is provided.",
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
      <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {category}
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 dark:text-gray-400">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function FAQSection() {
  return (
    <div className="bg-white px-6 pb-24 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about buying and selling vehicles
            on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {faqData.map((category, index) => (
            <FAQCategory key={index} {...category} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?
          </p>
          <Button className="mt-4 bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
