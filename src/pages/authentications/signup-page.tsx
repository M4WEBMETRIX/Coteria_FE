import { useEffect, useState } from "react";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, SpinnerGap } from "@phosphor-icons/react";
import AuthLayout from "./auth-layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRegisterOrganisation } from "@/services/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useCanadaCharityLookup } from "@/services/generics/external-hooks";
import { useDebounce } from "@/hooks/use-debounce";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Please enter organization name")
      .max(200, "Organization name must be 200 characters or less"),
    email: z.string().email("Please enter a valid organization email address"),
    businessNumber: z.string().min(9, "Minimum of 9 character standard BN"),
    password: z
      .string()
      .min(8, "8 characters minimum")
      .regex(/[a-z]/, "One lowercase character")
      .regex(/[A-Z]/, "One uppercase character")
      .regex(/\d/, "One number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "One special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<SignupValues>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      businessNumber: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
    },
  });

  const { mutate: registerMutate, isPending: loading, isSuccess } = useRegisterOrganisation();

  const password = watch("password", "");
  const businessNumber = watch("businessNumber", "");
  const debouncedBN = useDebounce(businessNumber, 600);

  const {
    data: charityData,
    isFetching: charityFetching,
    isError: charityError,
    error: charityErrorObj,
    refetch: retryCharityLookup,
  } = useCanadaCharityLookup(debouncedBN);

  // Auto-populate org name, clear if not found or invalid
  useEffect(() => {
    if (!charityData?.isValid || !charityData?.legalName) {
      setValue("name", "", { shouldValidate: false });
      return;
    }
    setValue("name", charityData.legalName, { shouldValidate: true });
  }, [charityData]);

  // Clear name when BN is cleared or too short to trigger a lookup
  useEffect(() => {
    if (debouncedBN.trim().length < 9) {
      setValue("name", "", { shouldValidate: false });
    }
  }, [debouncedBN]);

  const passwordRequirements = [
    { text: "One lowercase character", met: /[a-z]/.test(password) },
    { text: "One uppercase character", met: /[A-Z]/.test(password) },
    { text: "8 characters minimum", met: password.length >= 8 },
    { text: "One number", met: /\d/.test(password) },
    {
      text: "One special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const onSubmit = (data: SignupValues) => {
    console.log(data, "Form");

    const payload = {
      name: data?.name,
      businessNumber: data?.businessNumber,
      adminEmail: data?.email,
      adminPassword: data?.password,
      optInProductUpdates: data?.newsletter,
    };

    registerMutate(payload);
    // setLoading(true);
    // setTimeout(() => setLoading(false), 3000);
  };

  useEffect(() => {
    if (isSuccess) {
      // navigate("/auth/setup-account");
      navigate("/auth/check-email", { state: { email: getValues("email") } });
      reset();
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      <ScrollArea className="flex max-h-[95vh] min-h-0 flex-1 items-center justify-center overflow-auto py-5">
        <div className="grid h-full w-full place-content-center">
          <div className="">
            <h2 className="mb-3.5 text-center text-[20px] leading-[100%] font-bold tracking-[1%] text-[#0A0A0C]">
              Create your Organization account
            </h2>
            <p className="mb-6 text-center leading-[100%] tracking-[0%] text-[#414143]">
              Get started with a free trial. No credit card required.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2">
              {/* Business Number */}
              <Field className="gap-0.5">
                <FieldLabel
                  htmlFor="business-number"
                  className="flex items-center gap-1 text-sm leading-5.5 font-bold tracking-[0%] text-[#414143]"
                >
                  Organization / Charity Business Number*
                  <WhyTooltip
                    content="To verify your organization’s legitimacy, we ask for your Charity Business Number (BN)
          issued by the Canada Revenue Agency (CRA). This helps ensure that organizations on Coterie
          are properly registered and trusted by donors."
                  />
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id="business-number"
                      type="text"
                      placeholder="Registered charity number"
                      {...register("businessNumber")}
                      className="h-11 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5 pr-10"
                    />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2">
                      {charityFetching ? (
                        <SpinnerGap className="h-4 w-4 animate-spin text-[#12AA5B]" />
                      ) : charityData?.isValid ? (
                        <CheckCircle weight="fill" className="h-4 w-4 text-[#12AA5B]" />
                      ) : (
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {/* Lookup feedback */}
                  {debouncedBN.length >= 9 &&
                    !charityFetching &&
                    (charityData?.isValid ? null : charityError ? (
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-xs text-red-500">
                          {(charityErrorObj as Error)?.message ||
                            "Could not reach charity registry."}
                        </p>
                        {!(charityErrorObj as any)?.isFormatError && (
                          <button
                            type="button"
                            onClick={() => retryCharityLookup()}
                            className="text-xs font-medium text-[#12AA5B] underline hover:text-[#0da055]"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    ) : null)}
                  {/* ))} */}
                  <FieldError errors={[errors.businessNumber]} />
                </FieldContent>
              </Field>

              {/* Organization Name */}
              <Field className="gap-0.5">
                <FieldLabel
                  htmlFor="name"
                  className="flex items-center gap-1 text-sm leading-5.5 font-bold tracking-[0%] text-[#414143]"
                >
                  Organization Name
                  {charityData?.isValid && !charityFetching && (
                    <span className="text-sm font-normal text-[#414143]">(auto-fill)</span>
                  )}
                  <WhyTooltip content="To ensure your charity number matches your registered organization’s name" />
                </FieldLabel>
                <FieldContent>
                  <Input
                    disabled
                    id="name"
                    type="text"
                    placeholder="e.g, Coterie"
                    {...register("name")}
                    value={watch("name")}
                    className="h-11 rounded-lg border-0 px-2.5 py-5 disabled:bg-[#F6F6F6]"
                  />
                  <FieldError errors={[errors.name]} />
                </FieldContent>
              </Field>

              {/* Email */}
              <Field className="gap-0.5">
                <FieldLabel
                  htmlFor="email"
                  className="text-sm leading-5.5 font-bold tracking-[0%] text-[#414143]"
                >
                  Use your organization email address
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@organization.org"
                    {...register("email")}
                    className="h-11 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5"
                  />
                  <FieldError errors={[errors.email]} />
                </FieldContent>
              </Field>

              {/* Password */}
              <Field className="gap-0.5">
                <FieldLabel
                  htmlFor="password"
                  className="text-sm leading-5.5 font-bold tracking-[0%] text-[#414143]"
                >
                  Password*
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      {...register("password")}
                      className="h-11 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError errors={[errors.password]} />
                </FieldContent>
              </Field>

              {/* Confirm Password */}
              <Field className="gap-0.5">
                <FieldLabel
                  htmlFor="confirm-password"
                  className="text-sm leading-5.5 font-bold tracking-[0%] text-[#414143]"
                >
                  Confirm Password*
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      className="h-11 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={[errors.confirmPassword]} />
                </FieldContent>
              </Field>

              {/* Password Requirements */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle
                      weight="fill"
                      size={18}
                      color={req.met ? "#12AA5B" : "#0A0A0C57"}
                    />

                    <span className={req.met ? "text-[#12AA5B]" : "text-[#0A0A0C57]"}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Newsletter Checkbox */}
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-4 w-4 cursor-pointer border border-gray-300 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <Label
                      htmlFor="newsletter"
                      className="mt-0.5 cursor-pointer text-sm leading-[100%] font-light tracking-[1%] text-[#414143]"
                    >
                      I'd like to receive product updates and best practices from Coterie
                    </Label>
                  </div>
                )}
              />
              {/* <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue="default"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        className="relative h-5 w-5 rounded-full border border-gray-300 after:absolute after:inset-1/3 after:rounded-full after:bg-green-500 after:content-[''] data-[state=checked]:border-green-500"
                        value="default"
                        id="newsletter"
                      />
                      <Label
                        htmlFor="newsletter"
                        className="cursor-pointer text-sm leading-[100%] font-normal tracking-[1%] text-[#414143]"
                      >
                        I'd like to receive product updates and best practices from Coterie
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              /> */}

              {/* Terms */}
              <p className="pt-2 text-sm leading-[100%] font-light tracking-[1%] text-[#414143]">
                By creating an account, you agree to Coterie's{" "}
                <Link
                  to="https://usecoterie.com/terms-of-use"
                  className="text-[#12AA5B] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and confirming that you have reviewed and accepted the{" "}
                <Link
                  to="https://usecoterie.com/privacy-policy"
                  className="text-[#12AA5B] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit Button */}
              <Button
                // loading={loading}
                disabled={!isValid}
                type="submit"
                className="w-full rounded-[24px] bg-[#12AA5B] py-6 font-semibold text-white hover:bg-green-600"
              >
                {loading ? "Creating account..." : "Get started for free"}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-[#0A0A0C]">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-normal text-green-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </ScrollArea>
    </AuthLayout>
  );
};

function WhyTooltip({ content }: { content?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="flex cursor-pointer items-center gap-1 text-sm font-normal text-[#12AA5B]">
          why <HelpCircle className="h-4 w-4" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-white shadow" side="right">
        <p className="max-w-[300px] text-sm text-[#1E1F24]">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default SignupPage;
