import { cn } from "@/lib/utils";
import { parseAsStringEnum, useQueryState } from "nuqs";

type Tab<T extends string> = {
  label: string;
  value: T;
};

type ButtonTabsProps<T extends readonly string[]> = {
  tabs: Tab<T[number]>[];
  values: T;
  defaultValue: T[number];
  queryKey?: string;
  className?: string;
};

export function ButtonTabs<T extends readonly string[]>({
  tabs,
  values,
  defaultValue,
  queryKey = "tab",
  className = "",
}: ButtonTabsProps<T>) {
  const [activeTab, setActiveTab] = useQueryState(
    queryKey,
    parseAsStringEnum([...values]).withDefault(defaultValue)
  );

  return (
    <div className={cn("flex h-10 w-full items-center gap-3", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            type="button"
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex h-10 w-max cursor-pointer items-center justify-center rounded-[10px] px-4 text-sm font-medium transition-all ${
              isActive
                ? "bg-[#12AA5B] text-[#FFFFFF]"
                : "bg-transparent text-[#818898] hover:text-[#111827]"
            } `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
