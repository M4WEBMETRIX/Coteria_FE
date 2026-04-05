import { userSidebarLinks } from "@/constants/nav-links";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#ECEFF3] bg-white lg:hidden">
      <div className="flex h-[65px] items-center justify-around px-2">
        {userSidebarLinks[0]?.subLinks?.map((link, index) => {
          const isActive = location.pathname.includes(link.path);
          return (
            <NavLink
              key={index}
              to={link.path}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center space-y-1 transition-colors",
                isActive ? "text-[#079455]" : "text-[#666D80] hover:text-[#0A0A0C]"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center",
                  isActive ? "text-[#079455]" : "text-[#666D80]"
                )}
              >
                {link?.icon}
              </div>
              <span className="text-[10px] font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
