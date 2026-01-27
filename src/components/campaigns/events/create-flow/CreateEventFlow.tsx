import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check } from "lucide-react";
import { eventFormSchema, defaultValues, type EventFormValues } from "./types";
import { StepEventType } from "./StepEventType";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepLocation } from "./StepLocation";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Event Type", component: StepEventType },
  { id: 2, title: "Basic Info", component: StepBasicInfo },
  { id: 3, title: "Location", component: StepLocation },
  { id: 4, title: "Date & Time", component: StepDateTime },
  { id: 5, title: "Details", component: StepDetails },
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
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar / Progress */}
      <div className="hidden w-64 border-r bg-white p-6 md:block">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="hover:text-primary pl-0 hover:bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to events
          </Button>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-red-500 font-medium text-white">
            Event Image
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Untitled Event</h2>
          <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            Draft
          </div>
        </div>

        <div className="relative space-y-0">
          <div className="absolute top-2 bottom-2 left-[15px] w-0.5 bg-gray-200" />

          {STEPS.map((step, index) => {
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <div key={step.id} className="relative mb-6 flex items-start last:mb-0">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isCurrent
                        ? "border-primary bg-white"
                        : "border-gray-200 bg-white"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        isCurrent ? "bg-primary" : "bg-gray-300"
                      )}
                    />
                  )}
                </div>
                <div className="ml-4 pt-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {step.id === 1 && "Choose event type"}
                      {step.id === 2 && "Add basic details"}
                      {step.id === 3 && "Set location"}
                      {step.id === 4 && "Set date & time"}
                      {step.id === 5 && "Add description"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <p className="text-muted-foreground mb-2 text-sm">
                Step {currentStep} of {STEPS.length}
              </p>
              <Progress value={progress} className="h-2" />
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CurrentStepComponent />
              </form>
            </FormProvider>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t bg-white p-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div /> // Spacer
            )}

            {currentStep < STEPS.length ? (
              <Button onClick={nextStep} className="bg-green-500 text-white hover:bg-green-600">
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
