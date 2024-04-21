import { useState, useEffect, useRef } from "react";

const LeftNav = ({ slides, selectedIndex, setSelectedIndex, isToggled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([]);
  const sliderRef = useRef(null);
  const [leftNavFocusedIndex, setLeftNavFocusedIndex] = useState(0);

  const visibleCount = 7;

  useEffect(() => {
    setVisibleSlides(slides.slice(currentIndex, currentIndex + visibleCount));
  }, [currentIndex, slides, visibleCount]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, []);

  const handlePrev = () => {
    if (leftNavFocusedIndex > 0) {
      setLeftNavFocusedIndex((prevIndex) => prevIndex - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (leftNavFocusedIndex < visibleCount - 1) {
      setLeftNavFocusedIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex < slides.length - visibleCount) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === 0 && isToggled) {
        switch (e.key) {
          case "ArrowRight":
            setSelectedIndex(1);
            break;
          case "ArrowUp":
            handlePrev();
            break;
          case "ArrowDown":
            handleNext();
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, isToggled, handlePrev, handleNext, setSelectedIndex]);

  console.log("focused index:", leftNavFocusedIndex);
  return (
    <div
      tabIndex={0}
      ref={sliderRef}
      className="flex flex-col items-center h-screen justify-center text-white"
    >
      <div className="flex flex-col items-center">
        {visibleSlides.map((slide, index) => {
          // const IconComponent = eval(slide.icon);
          return (
            <div
              key={index}
              className={`p-2 ${
                index === leftNavFocusedIndex ? "border border-white" : ""
              }`}
              tabIndex={index === leftNavFocusedIndex ? 0 : -1}
            >
              {/* <IconComponent size={24} /> */}
              <h1 className="text-[12px] w-full whitespace-nowrap truncate">
                {slide.name}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftNav;
