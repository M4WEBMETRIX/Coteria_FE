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
    question: "What makes Coterie different from other fundraising tools?",
    answer:
      "Coterie goes beyond tracking donations. It helps you understand why people give, what they care about, and who is driving growth so you can increase repeat donations and build stronger long-term relationships.",
  },
  {
    question: "What should I do first after onboarding?",
    answer:
      "Create your first campaign, invite your community, and connect Stripe to start receiving donations.",
  },
  {
    question: "Why do I need to connect Stripe?",
    answer:
      "Stripe allows you to securely receive donations and event payments directly in your organization's bank account. Coterie does not hold funds.",
  },
  {
    question: "How do I create a campaign?",
    answer:
      'Go to Campaigns and click “Create Campaign". Add a title, description, goal, and resources.',
  },
  {
    question: "Direct vs Ripple: What do the bars mean?",
    answer:
      "Green — Donations Received: Direct donations.\n Yellow — Donations Inspired: Donations driven by your supporters’ influence.",
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

export function FaqTab({ isUser }: { isUser?: boolean }) {
  const isOrgs = true;
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
                <AccordionTrigger className="cursor-pointer py-4 text-sm font-medium text-[#000000] hover:no-underline">
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
        {!isUser && !isOrgs && (
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
        )}
      </div>
    </div>
  );
}
