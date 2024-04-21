import React from "react";
import { useNavigate } from "react-router-dom";

const InitialButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movies");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="font-inter font-bold tracking-widest h-10 w-40 bg-[#61b3ed] rounded-xl"
      >
        Movies
      </button>
    </div>
  );
};

export default InitialButton;
