import { Button } from "@/components/ui/button";

import { User } from "@phosphor-icons/react";
import UserAuthCarousel from "../pages/authentications/user-auth-carousel";
import LogoSvgCode from "../pages/logo-svg-code";

const UserAuthLayout = ({
  children,
  isReferrer = false,
}: {
  children: React.ReactNode;
  isReferrer?: boolean;
}) => {
  return (
    <main className="flex h-screen">
      {/* left panel */}

      <div className="mx-auto w-full flex-1 overflow-y-auto p-4">
        {" "}
        <aside className="no-scrollbar mx-auto grid w-full max-w-151.5 place-content-center">
          <LogoSvgCode className="pl-7.5" />
          <div className="p-7.5">
            <div className="mt-10">
              <p className="text-4xl leading-[120%] font-bold tracking-[-2%]">
                {isReferrer ? "Invitation" : "Level Up Your Learning Journey"}
              </p>
              <p className="mt-3 text-sm leading-[160%] tracking-[0%] text-[#6F6F6F]">
                {isReferrer
                  ? "You are referred by:"
                  : "Sign Up and start your journey. Get 50% off discount for a fullset workshop"}
              </p>
            </div>

            {isReferrer ? (
              <div className="mt-5 flex h-25 items-center gap-3 rounded-[10px] border border-[#ECEFF3] px-5 py-3.5 shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]">
                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gray-200">
                  <User size={48} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="tracking-[0%]] text-2xl leading-[160%] font-medium tracking-[0.1px] text-[leading-[160%]">
                    Adebayo Oludare
                  </p>
                  <p className="text-sm leading-[160%] tracking-[0.1px] text-[#000000]">
                    adebayooludare@gmail.com
                  </p>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="mt-5 h-12 w-full border-gray-300 leading-[155%] tracking-[0%] hover:bg-gray-50"
                type="button"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign In with Google
              </Button>
            )}

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DFE1E7]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-sm leading-[155%] tracking-[0%] text-[#6F6F6F]">
                  {isReferrer ? "Extended Lineage" : "or"}
                </span>
              </div>
            </div>
            {children}
          </div>
        </aside>
      </div>
      {/* right panel */}
      <div className="w-full max-w-[60%]">
        <UserAuthCarousel />
      </div>
    </main>
  );
};

export default UserAuthLayout;
