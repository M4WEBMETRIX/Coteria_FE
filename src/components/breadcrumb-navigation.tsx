import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { LayoutContext } from "@/components/layout/dashboard-layout";
import { useEffect, useMemo, useRef, useContext } from "react";
import { Link } from "react-router-dom";

// Mock/Stub for missing dependencies
const useCurrentVerticalDetails = () => ({
  agent_slug: "default",
  business_name: "Coterie",
  business_type: "agency",
});
const getLocalizedPath = (path: string) => path;

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbConfig {
  items: BreadcrumbItem[];
  className?: string;
  translator?: (key: string) => string;
}
/**
 * Custom hook for managing breadcrumb navigation in the layout
 *
 * @param config - Configuration object for breadcrumb items and styling
 *
 * @example
 * // Basic usage with navigation links
 * useBreadcrumb({
 *   items: [
 *     { label: "Dashboard", href: "/dashboard" },
 *     { label: "Hotels", href: "/hotels" },
 *     { label: "Room Details" } // Current page (no href needed)
 *   ]
 * });
 *
 * @example
 * // With custom styling
 * useBreadcrumb({
 *   items: [
 *     { label: "Business", href: "/vertical/hotel/dashboard" },
 *     { label: "Rooms", href: "/vertical/hotel/rooms" },
 *     { label: "Room Details", isCurrentPage: true }
 *   ],
 *   className: "mb-4 text-sm"
 * });
 *
 * @example
 * // Dynamic breadcrumbs based on route params
 * const roomId = useParams().id;
 * useBreadcrumb({
 *   items: [
 *     { label: "Dashboard", href: "/dashboard" },
 *     { label: "Rooms", href: "/rooms" },
 *     { label: `Room ${roomId}` }
 *   ]
 * });
 */
export const useBreadcrumb = (config: BreadcrumbConfig) => {
  const { business_type: agency } = useCurrentVerticalDetails();
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useBreadcrumb must be used within a DashboardLayout");
  }

  const { setBreadcrumbComponent } = context;
  const prevConfigRef = useRef<BreadcrumbConfig | null>(null);
  const prevElementRef = useRef<React.ReactNode>(null);

  // Check if config actually changed (deep comparison)
  const configChanged =
    !prevConfigRef.current ||
    JSON.stringify(prevConfigRef.current.items) !== JSON.stringify(config.items) ||
    prevConfigRef.current.className !== config.className ||
    prevConfigRef.current.translator !== config.translator;

  // Memoize the breadcrumb element to prevent unnecessary re-renders
  const breadcrumbElement = useMemo(() => {
    // Only recreate element if config actually changed
    if (!configChanged && prevElementRef.current) {
      return prevElementRef.current;
    }

    const element = (
      <Breadcrumb className={config.className || ""}>
        <BreadcrumbList>
          {config.items.map((item, index) => {
            const isLast = index === config.items.length - 1;
            const isCurrentPage = item.isCurrentPage ?? isLast;

            return (
              <div key={index} className="flex items-center gap-2">
                <BreadcrumbItem>
                  {isCurrentPage ? (
                    <BreadcrumbPage className="text-sm font-medium text-[#1D2433] first-letter:uppercase">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <Link
                      to={getLocalizedPath(item.href || "#")}
                      className={"text-[#99A0AE] capitalize"}
                    >
                      {item.label}
                    </Link>
                  )}
                </BreadcrumbItem>
                {!isLast && <div>/</div>}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );

    // Store for next comparison
    prevElementRef.current = element;
    prevConfigRef.current = config;
    return element;
  }, [config, configChanged]);

  useEffect(() => {
    setBreadcrumbComponent(breadcrumbElement);

    // Cleanup when component unmounts
    return () => setBreadcrumbComponent(null);
    // Only run when agency changes or when breadcrumbElement actually changes content
  }, [setBreadcrumbComponent, agency, config]);
};

// Simple usage
// useBreadcrumb({
//   items: [
//     { label: "Business", href: "/vertical/hotel/dashboard" },
//     { label: "Rooms", href: "/vertical/hotel/rooms" },
//     { label: "Room Details", isCurrentPage: true },
//   ],
// });
