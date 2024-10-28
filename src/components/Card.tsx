import React from "react";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => {
  return (
    <div className={`rounded-lg shadow-lg p-4 ${className}`}>
      {children}
    </div>
  );
};
