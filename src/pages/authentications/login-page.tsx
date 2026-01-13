import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./auth-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid organization email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/community");
    }, 2000);
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen">
        <div className="flex h-screen flex-1 items-center justify-center overflow-auto">
          <div className="grid h-full w-full place-content-center">
            <div className="w-full">
              <h2 className="mb-3.5 text-center text-[32px] leading-[100%] font-semibold tracking-[1%] text-[#0A0A0C]">
                Sign in to your account
              </h2>
              <p className="mb-12.5 px-4 text-center text-base leading-[140%] tracking-[0%] text-[#414143]">
                Sign in to manage your campaigns, track community engagement, and view impact
                insights.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2">
                {/* Email */}
                <Field className="grid grid-cols-1">
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
                      className="h-12 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5"
                    />
                    <FieldError errors={[errors.email]} />
                  </FieldContent>
                </Field>

                {/* Password */}
                <Field className="">
                  <FieldLabel
                    htmlFor="password"
                    className="text-base leading-5.5 font-medium tracking-[0%] text-[#414143]"
                  >
                    Password*
                  </FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...register("password")}
                        className="h-12 rounded-lg border-0 bg-[#F6F6F6] px-2.5 py-5 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FieldError errors={[errors.password]} />
                  </FieldContent>
                </Field>

                {/* Forgot Password */}
                <div className="flex justify-start text-base font-normal">
                  <p className="text-[#414143]">
                    Forgot your password?{" "}
                    <Link
                      to="/auth/forgot-password"
                      className="font-normal text-[#12AA5B] hover:underline"
                    >
                      Reset password
                    </Link>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  loading={loading}
                  disabled={!isValid}
                  type="submit"
                  className="w-full rounded-full bg-[#12AA5B] py-6 text-base font-semibold text-white hover:bg-green-600"
                >
                  {loading ? "Logging in..." : "Log in"}
                </Button>

                {/* Signup Link */}
                <p className="text-center text-base text-[#414143]">
                  Don't have an account?{" "}
                  <Link to="/auth/signup" className="font-normal text-[#12AA5B] hover:underline">
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

export default LoginPage;
