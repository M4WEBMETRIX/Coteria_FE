import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparkleIcon } from "@phosphor-icons/react";

const faqs = [
  {
    question: "What types of campaign do you offer?",
    answer:
      "At Khabibeq Real Estate, we offer a variety of luxury properties including duplexes, terraces, detached and semi-detached homes in prime locations such as Lekki, Ikoyi, Victoria Island, and Ajah",
  },
  {
    question: "How do I update my profile?",
    answer: "You can update your profile by navigating to Settings > Profile.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time from the billing settings.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach out to us via the Contact Us tab or email support@coterie.com.",
  },
  {
    question: "Where can I find my reports?",
    answer: "Reports are located in the Reports tab on the sidebar.",
  },
];

const suggestions = [
  "Why did engagement spike recently?",
  "What should I do today?",
  "Summarize a campaign",
  "Is our community healthy right now?",
  "What changed this week?",
  "Compare campaign performance for me",
];

export function FaqTab() {
  return (
    <div className="h-full">
      <h2 className="mb-4 text-lg font-semibold text-[#0A0A0C]">Frequently Asked Question</h2>

      <div className="flex h-full items-start gap-5">
        {/* FAQ Section */}
        <div className="flex-1">
          <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-t-[10px] border border-[#DFE1E7] bg-white px-4 data-[state=open]:bg-gray-50"
              >
                <AccordionTrigger className="py-4 text-sm font-medium text-[#000000] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-xs leading-[22px] text-[#5A5D63]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* AI Insights Panel */}
        <div className="relative flex h-fit min-h-[600px] w-1/2 shrink-0 flex-col items-center rounded-xl border border-[#DFE1E7] bg-white p-6 text-center">
          <div className="mb-8 flex w-full items-center justify-between">
            <span className="font-semibold text-[#0A0A0C]">Coterie Ai Insights</span>
          </div>

          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
            {/* Green Circle Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg shadow-emerald-100">
              <SparkleIcon size={32} weight="fill" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[#0A0A0C]">Welcome, John! 👋</h3>
              <p className="mx-auto max-w-[250px] text-xs text-gray-500">
                I'm here to help you with answers, ideas, or anything you need. Just start typing
                below!
              </p>
            </div>

            <div className="w-full space-y-3">
              <p className="text-xs text-gray-400">Suggestion...</p>
              <div className="flex w-full flex-col gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full rounded-lg border border-transparent bg-[#F9FAFB] px-4 py-3 text-xs text-gray-600 transition-colors hover:border-gray-200 hover:bg-gray-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="relative mt-6 w-full">
            <div className="relative flex items-center rounded-full bg-[#F3F4F6] px-4 py-2">
              <SparkleIcon className="mr-2 h-5 w-5 text-gray-400" />
              <Input
                className="h-auto border-none bg-transparent py-2 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-0"
                placeholder="Ask anything to sense AI..."
              />
              <Button
                size="icon"
                className="ml-2 h-7 w-7 shrink-0 rounded-full bg-[#10B981] hover:bg-[#059669]"
              >
                {/* Using simple primitive icon or phosphor if available */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
