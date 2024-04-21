import { useState, useEffect, useMemo, useRef } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const calculateVisibleSlides = (width) => {
  if (width > 1024) {
    return 5;
  } else if (width > 750) {
    return 3;
  } else if (width > 500) {
    return 2;
  } else {
    return 1;
  }
};

const Slider2 = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState < [] > [];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sliderRef = useRef < HTMLDivElement > null;
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const visibleCount = useMemo(
    () => calculateVisibleSlides(windowWidth),
    [windowWidth]
  );
  useEffect(() => {
    setVisibleSlides(slides.slice(currentIndex, currentIndex + visibleCount));
  }, [currentIndex, slides, visibleCount]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < slides.length - visibleCount
        ? prevIndex + 1
        : slides.length - visibleCount
    );
    setFocusedIndex((prevIndex) =>
      prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  console.log("focusedIndex:", focusedIndex);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        handlePrev();
        break;
      case "ArrowRight":
        handleNext();
        break;
      default:
        break;
    }
  };

  return (
    <div
      tabIndex={0}
      ref={sliderRef}
      onKeyDown={handleKeyDown}
      className=" flex flex-row items-center justify-center w-full h-screen"
    >
      <div className="flex items-center justify-center absolute left-0 bg-slate-200 p-2 rounded-md">
        {slides.length !== 0 && currentIndex !== 0 && (
          <button onClick={handlePrev}>
            <MdKeyboardArrowLeft />
          </button>
        )}
      </div>
      <div className="flex flex-grow">
        {visibleSlides.map((slide, index) => (
          <div key={index} className={`p-2 flex-1 `}>
            <img
              src={slide.thumbnail}
              alt=""
              className="w-full aspect-[16/9] object-cover"
            />
            <h1 className="text-[12px] w-full whitespace-nowrap truncate">
              {slide.title}
            </h1>
            <h1>{index}</h1>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center absolute right-0 bg-slate-200 p-2 rounded-md ">
        {slides.length !== 0 && currentIndex < slides.length - visibleCount && (
          <button onClick={handleNext}>
            <MdKeyboardArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider2;
