import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";

import { ArrowRightIcon, Eye } from "@phosphor-icons/react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import UserAuthLayout from "@/end-user-app/layout/layout";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { useLoginUser } from "@/services/users/user-auth";
import EmailVerificationFlow from "./sign-up-verify-modal";
import { useUserResendVerificationEmail } from "@/services/auth";
import { useQueryState } from "nuqs";
import GoogleAuth from "@/end-user-app/layout/google-auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid organization email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const isAuthenticated = () => {
  return !!localStorage.getItem("userAccessToken");
};

const UserSignIn = () => {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: userLoginMutate, isPending: loading, isSuccess, data } = useLoginUser();
  const { mutate: userResendVerificationEmailMutate } = useUserResendVerificationEmail();
  const [returnUrl] = useQueryState("returnUrl");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.requiresEmailVerification) {
        setShowVerification(true);
        userResendVerificationEmailMutate({});
      } else {
        // Redirect to returnUrl if present, otherwise default dashboard
        const destination = returnUrl || "/user/dashboard?tab=home";
        if (destination.startsWith("http")) {
          window.location.href = destination;
        } else {
          navigate(destination, { replace: true });
        }
      }
    }
  }, [isSuccess]);

  const onSubmit = (data: LoginFormValues) => {
    // console.log(data);
    // setLoading(true);

    userLoginMutate(data);
  };

  if (isAuthenticated() && !isSuccess) {
    return <Navigate to="/user/dashboard?tab=home" replace />;
  }
  // useEffect(() => {
  //   if (data?.data?.requiresEmailVerification || data?.data?.emailVerified) {
  //     setShowVerification(true);
  //   }
  // }, [data?.data?.requiresEmailVerification, data?.data?.emailVerified]);

  // Your communities have been active while you were away
  // Welcome back
  return (
    <UserAuthLayout title="" subTitle="">
      <div className="w-full">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Name Field */}

          <Field className="!gap-0 space-y-1 !p-0">
            <FieldLabel
              htmlFor="name"
              className="!mb-1 !p-0 text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
            >
              Email Address<span className="text-red-500">*</span>
            </FieldLabel>
            <FieldContent className="!m-0 !bg-transparent !p-0">
              <Input
                id="name"
                type="text"
                placeholder="Enter your name or email"
                // value={formData.name}
                {...register("email")}
                required
                className="h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] p-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
              />

              <FieldError errors={[errors.email]} />
            </FieldContent>
          </Field>

          {/* Password Field */}

          <Field className="!gap-0 space-y-1 !p-0">
            <FieldLabel
              htmlFor="password"
              className="text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
            >
              Password<span className="text-red-500">*</span>
            </FieldLabel>
            <FieldContent className="!m-0 !bg-transparent !p-0">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye weight="duotone" className="h-6 w-6 text-[#919191]" />
                  )}
                </button>
              </div>
              <FieldError errors={[errors.password]} />
            </FieldContent>
          </Field>

          <Link
            to="/user/forgot-password"
            className="mb-[6px] flex items-center justify-center text-center text-sm leading-[160%] font-medium tracking-[0%] text-[#0F0F0F] underline hover:text-[#059669] hover:underline"
          >
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <Button
            // loading={loading}
            disabled={!isValid}
            type="submit"
            className="flex h-12.5 w-full items-center justify-between rounded-full border border-[#E5E5E5] bg-[#079455] px-2 text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90 lg:px-2"
          >
            {loading ? "Signing in..." : "Sign In"}

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
            </div>
          </Button>
          <GoogleAuth googleText="Continue with Google" />
        </form>

        {/* Sign In Link */}
        <p className="mt-5 text-center text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
          Don’t have an account?{" "}
          <Link
            to={`/user/signup${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            className="text-[#000000] underline hover:text-[#059669] hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <EmailVerificationFlow
          email={data?.data?.email}
          showVerification={showVerification}
          setShowVerification={setShowVerification}
          returnUrl={returnUrl || undefined}
        />
      </div>
    </UserAuthLayout>
  );
};

export default UserSignIn;
