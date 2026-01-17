import { Outlet } from "react-router-dom";

const UbuntuLayout = () => {
  return (
    <div className="font-ubuntu min-h-screen">
      <Outlet />
    </div>
  );
};

export default UbuntuLayout;
