import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Slider = () => {
  const [start, setStart] = useState(1);

  const handleNextClick = () => {
    setStart((i) => i + 1);
  };

  const handlePrevClick = () => {
    if (start > 1) {
      setStart((i) => i - 1);
    }
  };

  const generateBlocks = () => {
    const blocks = [];
    for (let i = start; i <= start + 4; i++) {
      blocks.push(<div key={i}>{i} </div>);
    }
    return blocks;
  };

  return (
    <div className="flex flex-row">
      <button onClick={handlePrevClick}>
        <MdKeyboardArrowLeft />
      </button>
      <div className="slider-container flex flex-row">{generateBlocks()}</div>
      <button onClick={handleNextClick}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Slider;
