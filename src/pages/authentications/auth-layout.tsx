import TestimonialCarousel from "@/pages/authentications/testimonial-carousel";
import LOGO from "@/assets/icons/coterie-black.svg";
import BOTTOM_PATTERN from "@/assets/icons/bottom_left.svg";
import TOP_PATTERN from "@/assets/icons/top_right.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden flex-col justify-center bg-linear-to-br from-green-500 to-green-600 text-white lg:relative lg:flex lg:w-145 lg:max-w-145 lg:overflow-hidden">
        <img
          src={TOP_PATTERN}
          className="absolute -top-1.5 -right-10 h-28.25 w-23"
          alt="bottom_pattern"
        />
        <div>
          <div className="p-12.5">
            <div className="mb-16 flex w-max items-center justify-center rounded-full bg-white px-7.5 py-4.5">
              <img src={LOGO} className="h-7.25 w-31.25" alt="coterie_logo" />
            </div>

            <h1 className="mb-6 text-[44px] leading-11 font-semibold tracking-[0%]">
              Turn one-time
              <br />
              donations into lasting
              <br />
              community support
            </h1>

            <p className="text-lg leading-5.5 tracking-[0%] text-white">
              Coterie helps organizations retain donors, activate their
              <br />
              community, and understand what actually drives repeat
              <br />
              giving without replacing your existing donation tools.
            </p>
          </div>

          <TestimonialCarousel />
        </div>

        <img
          src={BOTTOM_PATTERN}
          className="absolute -bottom-24 h-55.75 w-72.5"
          alt="bottom_pattern"
        />
      </div>

      <div className="font-ubuntu mx-auto grid h-screen w-full max-w-130 place-content-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
