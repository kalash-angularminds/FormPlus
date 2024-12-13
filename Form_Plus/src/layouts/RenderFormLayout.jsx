import React from "react";

const RenderFormLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-md">
        {children}
          </div>
        </div>
  );
};

export default RenderFormLayout;
