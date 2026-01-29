import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { eventFormSchema, defaultValues, type EventFormValues } from "./types";
import { StepEventType } from "./StepEventType";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepLocation } from "./StepLocation";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepTicket from "./step-ticket";
import StepPublish from "./StepPublish";

const STEPS = [
  { id: 1, title: "Event Type", component: StepEventType },
  { id: 2, title: "Basic Info", component: StepBasicInfo },
  { id: 3, title: "Location", component: StepLocation },
  { id: 4, title: "Date & Time", component: StepDateTime },
  { id: 5, title: "Details", component: StepDetails },
  { id: 6, title: "Add tickets", component: StepTicket },
  { id: 7, title: "Publish", component: StepPublish },
];

export default function CreateEventFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    let isValid = false;

    // Validate fields for the current step
    switch (currentStep) {
      case 1:
        isValid = await trigger("eventType");
        break;
      case 2:
        isValid = await trigger(["title", "category", "summary"]);
        break;
      case 3:
        isValid = await trigger(["platform", "eventLink", "venueAddress"]);
        break;
      case 4:
        isValid = await trigger(["startDate", "startTime", "endDate", "endTime", "timezone"]);
        break;
      case 5:
        isValid = await trigger(["description"]);
        break;
      case 6:
        isValid = await trigger(["isTicketType", "tickets"]);
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: EventFormValues) => {
    console.log("Form Submitted:", data);
    // Here you would typically send the data to your backend
    alert("Event created successfully! (Check console for data)");
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  // const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="flex h-screen">
      {/* Sidebar / Progress */}
      <div className="hidden w-100 border-x bg-white p-6 md:block">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="hover:text-primary pl-0 text-sm leading-[20px] font-normal text-[#6B6B6B] hover:bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to events
          </Button>
        </div>

        <div className="mb-8">
          <div className="mb-5 flex h-35 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#FF5A5F] to-[#E04E53] font-medium text-white">
            Event Image
          </div>
          <h2 className="mb-3 text-lg leading-[100%] font-medium text-[#1E1E1E]/50">
            Untitled Event
          </h2>
          <Select
            // onValueChange={(val) => setValue("save_option", val)}
            defaultValue={"draft"}
          >
            <SelectTrigger className="!h-9 w-full rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]">
              <SelectValue placeholder="Save option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              {/* <SelectItem value="workshop">Workshop</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="relative space-y-0">
          {STEPS.map((step, index) => {
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <div key={step.id} className="relative mb-6 flex items-start last:mb-0">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <p
                        className={cn(
                          "h-3 w-3 rounded-full",
                          isCompleted
                            ? "bg-primary border-primary text-white"
                            : isCurrent
                              ? "bg-primary/50"
                              : "bg-[#E8EAED]"
                        )}
                      />
                      {step.id !== 7 && <p className="h-12 w-0.5 bg-[#E8EAED]" />}
                    </div>
                    <div>
                      <p className="-mt-0.5 text-sm leading-[20px] font-normal text-[#1E1E1E]">
                        {step?.title}
                      </p>
                      {(isCompleted || isCurrent) && (
                        <p className="mt-1 text-xs leading-[19.5px] font-normal text-[#6B6B6B]">
                          {step.id === 1 && "Host virtual events via streaming or video conference"}
                          {step.id === 2 &&
                            "Let's start with the basics to help people understand what your event is about"}
                          {step.id === 3 && "Tell us how you'll be hosting your online event"}
                          {step.id === 4 && "Set up the date and time for your event"}
                          {step.id === 5 && "Tell people about your event"}
                          {step.id === 6 && "Set up your tickets"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full overflow-auto">
        <div className="flex-1 px-8 md:px-12">
          <div className="mx-auto">
            {/* <div className="mb-8">
              <p className="text-muted-foreground mb-2 text-sm">
                Step {currentStep} of {STEPS.length}
              </p>
              <Progress value={progress} className="h-2" />
            </div> */}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CurrentStepComponent />
              </form>
            </FormProvider>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 px-8 md:px-12">
          <div className="mx-auto flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                className="h-12 w-25 rounded-[8px] border border-[#E8EAED]"
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
            ) : (
              <div /> // Spacer
            )}

            {currentStep < STEPS.length ? (
              <Button
                onClick={nextStep}
                className="h-12 w-[125px] rounded-[6px] bg-green-500 text-white hover:bg-green-600"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Save & Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
