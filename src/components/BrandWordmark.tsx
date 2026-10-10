import React from "react";

interface BrandWordmarkProps {
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  size = "lg",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg sm:text-xl",
    xl: "text-xl sm:text-2xl",
    "2xl": "text-2xl sm:text-3xl",
  }[size];

  return (
    <span
      className={`inline-flex items-baseline font-bold tracking-tight select-none leading-none whitespace-nowrap font-sans ${sizeClasses} ${className}`}
      aria-label="MediExplain AI"
    >
      <span className="text-[#081D2E]">Medi</span>
      <span className="text-[#008278]">Explain</span>
      <span className="text-[#081D2E] ml-[2px]">AI</span>
    </span>
  );
};
