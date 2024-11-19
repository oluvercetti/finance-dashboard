import React from 'react';

interface FullPageLoaderProps {
  text?: string;
  type?: "Spinner" | "Loader";
}

const FullPageLoader = ({ text = "Loading...", type = "Spinner" }: FullPageLoaderProps) => {
  return (
    <div className="flex items-center justify-center bg-white z-50 w-full mt-[15%]">
      {type === "Spinner" && <div className="loader2" />}
      {type === "Loader" && <div className="loader" />}
      <p className="animate-pulse text-blue-500 text-lg ml-4">{text}</p>
    </div>

  );
};

export default FullPageLoader;