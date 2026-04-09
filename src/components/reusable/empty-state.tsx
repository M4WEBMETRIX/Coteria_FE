// import React from 'react'
import EmptyCampaigns from "@/assets/icons/empty-campaigns.svg";

interface EmptyStateProps {
  title?: string;
  description?: string;
  imgClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showImg?: boolean;
  className?: string;
}

const EmptyState = ({
  title,
  description,
  imgClassName = "h-[72px] w-[72px]",
  titleClassName,
  descriptionClassName,
  showImg = true,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`mt-6 flex flex-col items-center justify-center rounded-[8px] bg-white p-4 ${className}`}
    >
      {showImg && (
        <img src={EmptyCampaigns} alt="empty-campaigns" className={`mb-3 ${imgClassName}`} />
      )}
      <p
        className={`trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24] ${titleClassName}`}
      >
        {title}
      </p>

      <p
        className={`max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98] ${descriptionClassName}`}
      >
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
