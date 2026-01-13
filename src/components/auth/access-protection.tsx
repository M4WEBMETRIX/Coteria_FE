import { Outlet } from "react-router-dom";

const AccessProtection = () => {
  const isKeyPresent = !!import.meta.env.VITE_APP_ACCESS_KEY;

  if (!isKeyPresent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight text-red-600">Service Unavailable</h2>
          <p className="mt-2 text-sm text-gray-600">
            The application is not configured correctly. Missing access key.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AccessProtection;
