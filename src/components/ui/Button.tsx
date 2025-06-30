"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center border-none rounded-xl font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden text-decoration-none font-inherit";
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${widthClass} button-${variant} ${className}`}
    >
      {loading && (
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
      )}
      <span className={loading ? "opacity-70" : "opacity-100"}>{children}</span>
    </button>
  );
}
