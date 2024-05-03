import { useState, useEffect, useRef } from "react";
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchLine,
  RiMovie2Line,
  RiUser6Line,
  RiSlideshow4Fill,
  RiSlideshow4Line,
} from "react-icons/ri";

const LeftNav = ({ selectedIndex, setSelectedIndex, isToggled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([]);
  const sliderRef = useRef(null);
  const [leftNavFocusedIndex, setLeftNavFocusedIndex] = useState(0);

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
    if (leftNavFocusedIndex < 6) {
      setLeftNavFocusedIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex < slides.length - 7) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === 0 && !isToggled) {
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

  // console.log("focused index:", leftNavFocusedIndex);
  return (
    <div
      tabIndex={0}
      ref={sliderRef}
      className="flex flex-col items-center h-screen justify-center text-white"
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center space-y-16">
          <a
            href="#"
            className={`text-white ${
              leftNavFocusedIndex === 0 ? "bg-gray-500 rounded-full p-2" : ""
            }`}
          >
            <RiUser6Line />
          </a>
          <a
            href="#"
            className={`text-white ${
              leftNavFocusedIndex === 1 ? "bg-gray-500 rounded-full p-2" : ""
            }`}
          >
            <RiSearchLine />
          </a>
          <a
            href="#"
            className={`text-white ${
              leftNavFocusedIndex === 2 ? "bg-gray-500 rounded-full p-2" : ""
            }`}
          >
            <RiHome2Line />
          </a>
          <a
            href="#"
            className={`text-white ${
              leftNavFocusedIndex === 3 ? "bg-gray-500 rounded-full p-2" : ""
            }`}
          >
            <RiMovie2Line />
          </a>
          <a
            href="#"
            className={`text-white ${
              leftNavFocusedIndex === 4 ? "bg-gray-500 rounded-full p-2" : ""
            }`}
          >
            <RiSlideshow4Line />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
