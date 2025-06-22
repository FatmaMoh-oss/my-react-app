import React from "react";

interface LoadingTextProps {
  length: "short" | "long";
}

const LoadingText: React.FC<LoadingTextProps> = ({ length }) => {
  return (
    <div
      className={`flex ${
        length === "long"
          ? "flex-col space-y-2 w-full"
          : "items-center space-x-2"
      }`}
    >
      {length === "short" ? (
        <div className="bg-gray-300 h-4 w-24 rounded animate-pulse" />
      ) : (
        <>
          <div className="bg-gray-300 h-4 w-full rounded animate-pulse" />
          <div className="bg-gray-300 h-4 w-full rounded animate-pulse" />
          <div className="bg-gray-300 h-4 w-full rounded animate-pulse" />
        </>
      )}
    </div>
  );
};

export default LoadingText;
