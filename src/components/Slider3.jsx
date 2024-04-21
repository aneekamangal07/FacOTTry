import { useState, useEffect, useMemo, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/**
 * The function `calculateVisibleSlides` determines the number of visible slides based on the width
 * provided as input.
 * @param {number} width - The `calculateVisibleSlides` function takes a `width` parameter of type
 * number as input. The function calculates the number of visible slides based on the width provided.
 * If the width is greater than 1024, it returns 5 visible slides. If the width is between 750 and 102
 * @returns The function `calculateVisibleSlides` returns the number of visible slides based on the
 * input `width`. The number of visible slides returned is determined by the following conditions:
 * - If the `width` is greater than 1024, it returns 5.
 * - If the `width` is greater than 750 but less than or equal to 1024, it returns 3.
 * - If the
 */
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

const Slider3 = ({
  slides,
  selectedIndex,
  setSelectedIndex,
  setSelectedMovie,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sliderRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

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
    if (focusedIndex > 0) {
      setFocusedIndex((prevIndex) => prevIndex - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (focusedIndex < visibleCount - 1) {
      setFocusedIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex < slides.length - visibleCount) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDownSlider = (e) => {
      if (selectedIndex === 2) {
        switch (e.key) {
          case "ArrowUp":
            setSelectedIndex(1);
            break;
          case "ArrowLeft":
            handlePrev();
            break;
          case "ArrowRight":
            handleNext();
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDownSlider);

    return () => {
      document.removeEventListener("keydown", handleKeyDownSlider);
    };
  }, [selectedIndex, focusedIndex, currentIndex, slides, visibleCount]);
  return (
    <div className="bg-black w-full flex-[0.3]">
      <div tabIndex={0} ref={sliderRef} className="flex flex-row items-center">
        <div className="flex items-center justify-center absolute left-0 bg-slate-200 p-2 rounded-[50%]">
          {slides.length !== 0 && currentIndex !== 0 && (
            <button onClick={handlePrev}>
              <MdKeyboardArrowLeft />
            </button>
          )}
        </div>
        <div className="flex flex-grow">
          {visibleSlides.map((slide, index) => (
            <div
              key={index}
              className={`p-2 flex-1 ${
                index === focusedIndex ? "border border-[#ffffff]" : ""
              }`}
              tabIndex={index === focusedIndex ? 0 : -1}
              onClick={() => handleMovieClick(slide)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${slide.poster_path}`}
                alt=""
                className="w-full h-auto aspect-[9/16] object-cover"
              />
              <h1 className="text-[15px] py-2 text-white font-inter w-full whitespace-nowrap truncate">
                {slide.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center absolute right-0 bg-slate-200 p-2 rounded-[50%]">
          {slides.length !== 0 &&
            currentIndex < slides.length - visibleCount && (
              <button onClick={handleNext}>
                <MdKeyboardArrowRight />
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Slider3;