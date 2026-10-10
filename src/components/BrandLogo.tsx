import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  size = "md",
  alt = "MediExplain AI Logo",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  }[size];

  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`object-contain shrink-0 aspect-square rounded-full select-none ${sizeClasses} ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
