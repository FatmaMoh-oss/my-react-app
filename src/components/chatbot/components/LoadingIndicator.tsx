import React from "react";

const LoadingIndicator: React.FC = () => (
  <div className="w-full p-1 flex justify-start">
    <div className="rounded-lg rounded-bl-none bg-[#F0F0F0] text-black p-2 flex items-center">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  </div>
);

export default LoadingIndicator;
