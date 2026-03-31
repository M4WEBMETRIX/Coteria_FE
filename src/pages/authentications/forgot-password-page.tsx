import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./auth-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { useForgotPassword } from "@/services/auth";
import { useEffect } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid organization email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordValues>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPasswordMutate, isPending, isSuccess } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordValues) => {
    forgotPasswordMutate(data);
    // After sending the link, navigate to the check-email page
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/check-email");
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      <div className="flex min-h-screen">
        <div className="flex h-screen flex-1 items-center justify-center overflow-auto">
          <div className="grid h-full w-full max-w-130 place-content-center">
            <div className="w-[448px]">
              <h2 className="mb-3.5 text-center text-[32px] leading-[100%] font-semibold tracking-[1%] text-[#0A0A0C]">
                Reset your password
              </h2>
              <p className="mb-12.5 px-8 text-center text-sm leading-[140%] tracking-[0%] text-[#414143]">
                Enter the email address associated with your Coterie account and we'll send you a
                link to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="text-base leading-5.5 font-medium tracking-[0%] text-[#414143]"
                  >
                    Use your organization email address
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@organization.org"
                      {...register("email")}
                      className="mt-2 h-12 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5"
                    />
                    <FieldError errors={[errors.email]} />
                  </FieldContent>
                </Field>

                {/* Submit Button */}
                <Button
                  disabled={!isValid || isPending}
                  type="submit"
                  className="w-full rounded-full bg-[#12AA5B] py-6 text-lg font-semibold text-white hover:bg-green-600"
                >
                  {isPending ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>

                {/* Signup Link */}
                <p className="text-center text-sm text-[#414143]">
                  Don't have an account?{" "}
                  <Link to="/auth/signup" className="font-medium text-[#12AA5B] hover:underline">
                    Create an account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
