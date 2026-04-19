import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff } from "lucide-react";

import UserAuthLayout from "@/end-user-app/layout/layout";
import { ArrowRightIcon, Eye } from "@phosphor-icons/react";
import EmailVerificationFlow from "./sign-up-verify-modal";
import { useQueryState } from "nuqs";
import ExtendedLineageModal from "./referral-lineage-modal";
import { useRegisterUser } from "@/services/users/user-auth";
import { Link, useSearchParams } from "react-router-dom";
import GoogleAuth from "@/end-user-app/layout/google-auth";

const UserSignUp = () => {
  const [isReferrer] = useQueryState("referral-code");
  const [returnUrl] = useQueryState("returnUrl");
  const [searchParams] = useSearchParams();
  const [isExtendedLineageOpen, setIsExtendedLineageOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const validateName = (name: string, field: string) => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/;

    if (!name.trim()) {
      return `${field} is required`;
    }

    if (name.length > 50) {
      return `${field} must be less than 50 characters`;
    }

    if (!nameRegex.test(name)) {
      return `${field} can only contain letters, spaces, hyphens, or apostrophes`;
    }

    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return "Email is required";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const password = formData.password;

  const passwordRequirements = [
    { text: "One lowercase character", met: /[a-z]/.test(password) },
    { text: "One uppercase character", met: /[A-Z]/.test(password) },
    { text: "8 characters minimum", met: password.length >= 8 },
    { text: "One number", met: /\d/.test(password) },
    { text: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((r) => r.met);

  const { mutate: userMutate, isPending, data } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstNameError = validateName(formData.firstName, "First name");
    const lastNameError = validateName(formData.lastName, "Last name");
    const emailError = validateEmail(formData.email);

    if (firstNameError || lastNameError || emailError) {
      setErrors({
        email: emailError,
        firstName: firstNameError,
        lastName: lastNameError,
      });
      return;
    }

    if (!isPasswordValid) return;

    // const payload = {formData, ...(isReferrer ? referralCode: isReferrer : {})}
    const payload = {
      ...formData,
      ...(isReferrer ? { referralCode: isReferrer } : {}),
    };
    userMutate(payload);
  };

  useEffect(() => {
    if (data?.data?.requiresEmailVerification) {
      setShowVerification(true);
    }
  }, [data?.data?.requiresEmailVerification]);

  return (
    <UserAuthLayout title="" subTitle="" isReferrer={isReferrer ? true : false}>
      <div className="">
        {/* {isReferrer && (
          <div className="mt-2.5 mb-7.5 flex items-center justify-between">
            <div
              className="cursor-pointer text-xs leading-[160%] font-medium tracking-[0.1px] underline hover:text-blue-500"
              onClick={() => setIsExtendedLineageOpen(true)}
            >
              Click here to view all referrals
            </div>
            <div className="flex -space-x-3">
              {lineageMembers.map((member, index) => (
                <img
                  key={member.id}
                  src={member.image}
                  alt={`Member ${index + 1}`}
                  className="h-7.75 w-7.75 rounded-full object-cover object-center"
                />
              ))}
            </div>
          </div>
        )} */}
        <ExtendedLineageModal isOpen={isExtendedLineageOpen} setIsOpen={setIsExtendedLineageOpen} />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="space-y-1.5">
            <Label
              className="text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
              htmlFor="firstName"
            >
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              maxLength={50}
              onChange={(e) => {
                const value = e.target.value;

                setFormData({ ...formData, firstName: value });

                setErrors({
                  ...errors,
                  firstName: validateName(value, "First name"),
                });
              }}
              className={`h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] px-2 py-3 ${
                errors.firstName ? "border-red-500" : "border-[#DFE1E7]"
              }`}
            />

            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>
          {/* Last Name */}
          <div className="space-y-1">
            <Label
              className="text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
              htmlFor="lastName"
            >
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              maxLength={50}
              onChange={(e) => {
                const value = e.target.value;

                setFormData({ ...formData, lastName: value });

                setErrors({
                  ...errors,
                  lastName: validateName(value, "Last name"),
                });
              }}
              className={`h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] px-2 py-3 ${
                errors.lastName ? "border-red-500" : "border-[#DFE1E7]"
              }`}
            />

            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>
          {/* Email */}
          <div className="space-y-1">
            <Label
              className="text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
            </Label>

            <Input
              id="email"
              type="text"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value;

                setFormData({ ...formData, email: value });

                setErrors({
                  ...errors,
                  email: validateEmail(value),
                });
              }}
              className={`h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] px-2 py-3 text-base ${
                errors.email ? "border-red-500" : "border-[#DFE1E7]"
              }`}
            />

            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          {/* Password */}
          <div className="space-y-1">
            <Label
              className="text-sm leading-[155%] font-medium tracking-[0%] text-[#404040]"
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12.5 w-full rounded-full border border-[#E5E5E5] !bg-[#FAFAFA] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye weight="duotone" className="h-6 w-6 text-[#919191]" />
                )}
              </button>
            </div>

            {/* Password Requirements — only show when user starts typing */}
            {password.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 flex-shrink-0 rounded-full ${
                        req.met ? "bg-[#45D884]" : "bg-[#DFE1E7]"
                      }`}
                    />
                    <span
                      className={`text-xs leading-[160%] ${
                        req.met ? "text-[#45D884]" : "text-[#6F6F6F]"
                      }`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isPasswordValid || isPending}
            className="flex h-12.5 w-full items-center justify-between rounded-full border border-[#E5E5E5] bg-[#079455] px-2 text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90 disabled:cursor-not-allowed disabled:opacity-50 lg:px-2"
          >
            {isPending ? "Creating Account..." : "Create Account"}

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
            </div>
          </Button>
          <GoogleAuth googleText="Sign Up with Google" />
        </form>

        <p className="mt-5 text-center text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
          Already have an account?{" "}
          <a
            href={`/user/login${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            className="text-[#000000] underline hover:text-[#059669] hover:underline"
          >
            Sign in
          </a>
        </p>

        {/* Terms */}
        <p className="mt-8 text-center text-sm leading-[100%] font-light font-medium tracking-[1%] text-[#737373]">
          By clicking the button above, you agree to our{" "}
          <Link to="https://usecoterie.com/terms-of-use" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="https://usecoterie.com/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <EmailVerificationFlow
        email={formData.email}
        showVerification={showVerification}
        setShowVerification={setShowVerification}
        returnUrl={returnUrl || undefined}
      />
    </UserAuthLayout>
  );
};

// const UserSignUp = () => {
//   const [isReferrer] = useQueryState("referral-code");
//   const [isExtendedLineageOpen, setIsExtendedLineageOpen] = useState(false);
//   const [showVerification, setShowVerification] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     // phoneNumber: "+2348011223345",
//   });

//   const { mutate: userMutate, isPending, data } = useRegisterUser();

//   // console.log(data);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // console.log("Form submitted:", formData);
//     userMutate(formData);
//   };

//   useEffect(() => {
//     if (data?.data?.requiresEmailVerification) {
//       setShowVerification(true);
//     }
//   }, [data?.data?.requiresEmailVerification]);

//   // console.log("verify", data?.data?.requiresEmailVerification);

//   return (
//     <UserAuthLayout
//       title="Your world is just beginning"
//       subTitle="A place where people gather, participate, and build trust together."
//       isReferrer={isReferrer ? true : false}
//     >
//       <div className="">
//         {isReferrer && (
//           <div className="mt-2.5 mb-7.5 flex items-center justify-between">
//             <div
//               className="cursor-pointer text-xs leading-[160%] font-medium tracking-[0.1px] underline hover:text-blue-500"
//               onClick={() => setIsExtendedLineageOpen(true)}
//             >
//               Click here to view all referrals
//             </div>
//             <div className="flex -space-x-3">
//               {lineageMembers.map((member, index) => (
//                 <img
//                   key={member.id}
//                   src={member.image}
//                   alt={`Member ${index + 1}`}
//                   className="h-7.75 w-7.75 rounded-full object-cover object-center"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         <ExtendedLineageModal isOpen={isExtendedLineageOpen} setIsOpen={setIsExtendedLineageOpen} />
//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* First Name Field */}
//           <div className="space-y-1.5">
//             <Label
//               className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
//               htmlFor="firstName"
//             >
//               First Name<span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="firstName"
//               type="text"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//               required
//               className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
//             />
//           </div>

//           {/* Last Name Field */}
//           <div className="space-y-1.5">
//             <Label
//               className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
//               htmlFor="lastName"
//             >
//               Last Name<span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="lastName"
//               type="text"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//               required
//               className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
//             />
//           </div>

//           {/* Email Field */}
//           <div className="space-y-1.5">
//             <Label
//               className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
//               htmlFor="email"
//             >
//               Email<span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               required
//               className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
//             />
//           </div>

//           {/* Password Field */}
//           <div className="space-y-1.5">
//             <Label
//               className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
//               htmlFor="password"
//             >
//               Password<span className="text-red-500">*</span>
//             </Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 required
//                 className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-6 w-6" />
//                 ) : (
//                   <Eye weight="duotone" className="h-6 w-6 text-[#919191]" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             // type="button"
//             // onClick={() => setShowVerification(true)}
//             className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
//           >
//             {isPending ? "Creating Account..." : "Create Account"}
//           </Button>
//         </form>

//         {/* Sign In Link */}
//         <p className="mt-5 text-left text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
//           Already have an account?{" "}
//           <a href="/user/login" className="text-[#000000] hover:text-blue-600 hover:underline">
//             Log In Here
//           </a>
//         </p>
//       </div>
//       <EmailVerificationFlow
//         email={formData.email}
//         showVerification={showVerification}
//         setShowVerification={setShowVerification}
//       />
//     </UserAuthLayout>
//   );
// };

export default UserSignUp;

// const lineageMembers = [
//   { id: 1, image: "https://i.pravatar.cc/150?img=1" },
//   { id: 2, image: "https://i.pravatar.cc/150?img=2" },
//   { id: 3, image: "https://i.pravatar.cc/150?img=3" },
//   { id: 4, image: "https://i.pravatar.cc/150?img=4" },
//   { id: 5, image: "https://i.pravatar.cc/150?img=5" },
// ];
