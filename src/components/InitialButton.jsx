import React from "react";

const InitialButton = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => (window.location.href = "/movies")}
        className="font-inter font-bold tracking-widest h-10 w-40 bg-[#61b3ed] rounded-xl"
      >
        Movies
      </button>
    </div>
  );
};

export default InitialButton;
