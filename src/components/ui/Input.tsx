"use client";

import React, { useState } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  className?: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  fullWidth = false,
  icon,
  className = "",
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = "relative flex flex-col";
  const widthClass = fullWidth ? "w-full" : "w-auto";
  const labelClasses = `text-sm font-medium mb-2 transition-colors duration-300 ${
    error ? "text-red-500" : "text-gray-700"
  }`;
  const inputContainerClasses = "relative flex items-center";
  const inputClasses = `w-full px-3 py-3 border-2 rounded-xl text-base transition-all duration-300 outline-none ${
    icon ? "pl-10" : "pl-3"
  } ${
    error
      ? "border-red-500 focus:shadow-red-500/20"
      : isFocused
      ? "border-blue-600 focus:shadow-blue-600/20"
      : "border-gray-300 hover:border-gray-400"
  } ${disabled ? "bg-gray-50" : "bg-white"}`;
  const iconClasses = `absolute left-3 text-lg transition-colors duration-300 ${
    error ? "text-red-500" : isFocused ? "text-blue-600" : "text-gray-400"
  }`;
  const errorClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  return (
    <div
      className={`${baseClasses} ${widthClass} input-container ${className}`}
    >
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={inputContainerClasses}>
        {icon && <span className={iconClasses}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          className={`input-field ${inputClasses}`}
        />
      </div>

      {error && (
        <div className={errorClasses}>
          <span>⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
}
