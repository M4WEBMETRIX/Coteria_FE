import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";

import { Eye } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthLayout from "@/end-user-app/layout/layout";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
// import { getNameFromEmail, setUserToLocalStorage } from "@/end-user-app/services/local-storage";
import { useLoginUser } from "@/services/users/user-auth";
import EmailVerificationFlow from "./sign-up-verify-modal";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid organization email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

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

  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.requiresEmailVerification) {
        setShowVerification(true);
      } else {
        navigate("/user/dashboard");
      }

      // setUserToLocalStorage({
      //   id: "123",
      //   name: getNameFromEmail(data?.email),
      //   email: data?.email,
      // });
    }
  }, [isSuccess]);

  const onSubmit = (data: LoginFormValues) => {
    // console.log(data);
    // setLoading(true);

    userLoginMutate(data);
  };

  // useEffect(() => {
  //   if (data?.data?.requiresEmailVerification || data?.data?.emailVerified) {
  //     setShowVerification(true);
  //   }
  // }, [data?.data?.requiresEmailVerification, data?.data?.emailVerified]);

  return (
    <UserAuthLayout
      title="Welcome back"
      subTitle="Your communities have been active while you were away"
    >
      <div className="w-full">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="name"
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
            >
              Name/Email<span className="text-red-500">*</span>
            </FieldLabel>
            <FieldContent>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name or email"
                // value={formData.name}
                {...register("email")}
                required
                className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
              />

              <FieldError errors={[errors.email]} />
            </FieldContent>
          </Field>

          {/* Password Field */}

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="password"
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
            >
              Password<span className="text-red-500">*</span>
            </FieldLabel>
            <FieldContent>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
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
            className="flex items-center justify-end text-right text-base leading-[160%] tracking-[0%] text-[#6F6F6F] hover:text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <Button
            loading={loading}
            disabled={!isValid}
            type="submit"
            className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="mt-5 text-left text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
          You don't have an account?{" "}
          <Link to="/user/signup" className="text-[#000000] hover:text-blue-600 hover:underline">
            Sign Up Here
          </Link>
        </p>
        <EmailVerificationFlow
          email={data?.data?.email}
          showVerification={showVerification}
          setShowVerification={setShowVerification}
        />
      </div>
    </UserAuthLayout>
  );
};

export default UserSignIn;
