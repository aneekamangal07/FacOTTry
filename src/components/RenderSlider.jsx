import React from "react";
import Slider3 from "./Slider3";

const RenderSlider = (slides, selectedIndex, setSelectedIndex, setSelectedMovie, title) => {
  return (
    <Slider3
      slides={slides}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      setSelectedMovie={setSelectedMovie}
      title={title}
    />
  );
};

export default RenderSlider;
