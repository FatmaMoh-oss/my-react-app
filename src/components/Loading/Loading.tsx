"use client";

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary-500"></div>
      </div>
    </div>
  );
};

export default Loading;
