import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CurrencyDollarIcon, GiftIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { EventFormValues } from "./types";

const StepTicket = () => {
  const {
    watch,
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext<EventFormValues>();
  const isTicketType = watch("isTicketType");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">Set up your tickets</h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Choose how attendees will register for your event
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">Ticket type</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            className={cn(
              "hover:border-primary/50 h-[160px] cursor-pointer transition-all",
              !isTicketType ? "border-[#12AA5B] bg-[#ECF5F0]" : ""
            )}
            onClick={() => setValue("isTicketType", false)}
          >
            <CardHeader className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#C7F3D1] p-2 text-[#00A63E]">
                  <GiftIcon className="h-5 w-5" />
                </div>
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2",
                    !isTicketType ? "border-primary bg-primary" : "border-gray-300"
                  )}
                >
                  {!isTicketType && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <CardTitle className="text-base font-medium text-[#1E1E1E]">Free Event</CardTitle>
              <CardDescription className="max-w-[320px] text-base text-[#6B6B6B]">
                Collect registrations without charging
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "hover:border-primary/50 h-[160px] cursor-pointer transition-all",
              isTicketType ? "border-[#12AA5B] bg-[#ECF5F0]" : ""
            )}
            onClick={() => {
              setValue("isTicketType", true);
              if (fields.length === 0) {
                append({
                  name: "",
                  price: 0,
                  quantity: 0,
                  description: "",
                  salesStart: "",
                  salesEnd: "",
                });
              }
            }}
          >
            <CardHeader className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#DBEAFE] p-2 text-[#155DFC]">
                  <CurrencyDollarIcon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border-2",
                      isTicketType ? "border-primary bg-primary" : "border-gray-300"
                    )}
                  >
                    {isTicketType && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
              <CardTitle className="text-[#1E1E1E]base text-base font-medium">Paid Event</CardTitle>
              <CardDescription className="max-w-[320px] text-base text-[#6B6B6B]">
                Sell tickets to your event
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {!isTicketType && (
        <div className="flex h-16 items-center rounded-[8px] bg-[#F8F9FA] p-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="!h-4 !w-4 border border-[#E8EAED]"
              id="limitFreeTickets"
              // Assuming there's a field for this, or reusing displayTimezone as placeholder?
              // The previous code used displayTimezone which seemed wrong.
              // I'll leave it commented or use a dummy for now as it wasn't the focus.
            />
            <Label
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
              htmlFor="limitFreeTickets"
            >
              Limit number of free tickets
            </Label>
          </div>
        </div>
      )}

      {isTicketType && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-[#1E1E1E]">Ticket types</h3>
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  price: 0,
                  quantity: 0,
                  description: "",
                  salesStart: "",
                  salesEnd: "",
                })
              }
              className="gap-2 bg-[#FF5A5F] text-white hover:bg-[#FF5A5F]/90"
            >
              <PlusIcon className="h-4 w-4" />
              Add ticket type
            </Button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative space-y-6 rounded-[8px] border border-[#E8EAED] p-6"
              >
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#1E1E1E]">Ticket name *</Label>
                    <Input
                      placeholder="e.g., General Admission"
                      className="h-12 border-transparent bg-[#F8F9FA]"
                      {...register(`tickets.${index}.name` as const)}
                    />
                    {errors.tickets?.[index]?.name && (
                      <p className="text-sm text-red-500">{errors.tickets[index].name.message}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#1E1E1E]">Price (₦) *</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-12 border-transparent bg-[#F8F9FA]"
                      {...register(`tickets.${index}.price` as const, { valueAsNumber: true })}
                    />
                    {errors.tickets?.[index]?.price && (
                      <p className="text-sm text-red-500">{errors.tickets[index].price.message}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#1E1E1E]">Quantity *</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-12 border-transparent bg-[#F8F9FA]"
                      {...register(`tickets.${index}.quantity` as const, { valueAsNumber: true })}
                    />
                    {errors.tickets?.[index]?.quantity && (
                      <p className="text-sm text-red-500">
                        {errors.tickets[index].quantity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-[#1E1E1E]">Description</Label>
                  <Textarea
                    placeholder="Describe what this ticket includes"
                    className="resize-none border-transparent bg-[#F8F9FA]"
                    {...register(`tickets.${index}.description` as const)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#1E1E1E]">
                      Sales start date/time
                    </Label>
                    <Input
                      type="datetime-local"
                      className="h-12 border-transparent bg-[#F8F9FA]"
                      {...register(`tickets.${index}.salesStart` as const)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#1E1E1E]">
                      Sales end date/time
                    </Label>
                    <Input
                      type="datetime-local"
                      className="h-12 border-transparent bg-[#F8F9FA]"
                      {...register(`tickets.${index}.salesEnd` as const)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-16 items-center rounded-[8px] border border-[#E8EAED] p-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                className="!h-4 !w-4 border border-[#E8EAED]"
                id="addOptionalDonation"
                checked={watch("addOptionalDonation")}
                onCheckedChange={(checked) => setValue("addOptionalDonation", checked === true)}
              />
              <Label
                className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
                htmlFor="addOptionalDonation"
              >
                Add optional donation
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepTicket;
