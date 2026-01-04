import { Button } from "@/components/ui/button";
import { Ghost, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F8FA] p-4 text-center">
      <div className="relative mb-8">
        {/* Animated Ghost Icon */}
        <div className="animate-bounce">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl">
            <Ghost size={64} className="text-[#12AA5B]" />
          </div>
        </div>
        {/* Shadow effect */}
        <div className="absolute -bottom-4 left-1/2 h-4 w-16 -translate-x-1/2 animate-pulse rounded-[100%] bg-black/5 blur-sm transition-all duration-1000" />
      </div>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-[#1E1F24] sm:text-5xl">404</h1>
      <h2 className="mb-4 text-xl font-semibold text-[#1E1F24]">Page Not Found</h2>

      <p className="mb-8 max-w-md text-[#8B8D98]">
        Oops! It seems like you've ventured into uncharted territory. The page you are looking for
        might have been removed or deleted.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="gap-2 border-[#DFE1E7] bg-white hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          className="gap-2 bg-[#12AA5B] text-white hover:bg-[#0E904B]"
        >
          <Home size={18} />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
