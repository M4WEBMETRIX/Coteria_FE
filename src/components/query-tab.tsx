import { parseAsStringEnum, useQueryState } from "nuqs";

type Tab<T extends string> = {
  label: string;
  value: T;
};

type QueryTabsProps<T extends readonly string[]> = {
  tabs: Tab<T[number]>[];
  values: T;
  defaultValue: T[number];
  queryKey?: string;
};

export function QueryTabs<T extends readonly string[]>({
  tabs,
  values,
  defaultValue,
  queryKey = "tab",
}: QueryTabsProps<T>) {
  const [activeTab, setActiveTab] = useQueryState(
    queryKey,
    parseAsStringEnum([...values]).withDefault(defaultValue)
  );

  return (
    <div className="flex h-9 w-full items-center rounded-[12px] bg-[#F8F9FA] p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            type="button"
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex h-[29px] w-full cursor-pointer items-center justify-center rounded-[12px] text-sm font-medium transition-all ${
              isActive
                ? "bg-white text-[#111827]"
                : "bg-transparent text-[#6B7280] hover:text-[#111827]"
            } `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
