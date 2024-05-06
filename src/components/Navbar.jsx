import { useState, useEffect, KeyboardEvent } from "react";
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchLine,
  RiMovie2Line,
  RiUser6Line,
  RiSlideshow4Fill,
  RiSlideshow4Line,
} from "react-icons/ri";

const Navbar = ({
  
  selectedIndex,
  setSelectedIndex,
  isToggled,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const visibleItemsLength = 5;

  useEffect(() => {
    const handleKeyDownNavbar = (event) => {
      if (selectedIndex === 0 && isToggled) {
        if (event.key === "ArrowDown") {
          setSelectedIndex(1);
        } else if (event.key === "ArrowRight") {
          setFocusedIndex((prevIndex) => (prevIndex + 1) % visibleItemsLength);
        } else if (event.key === "ArrowLeft") {
          setFocusedIndex(
            (prevIndex) =>
              (prevIndex - 1 + visibleItemsLength) % visibleItemsLength
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDownNavbar);

    return () => {
      document.removeEventListener("keydown", handleKeyDownNavbar);
    };
  }, [selectedIndex]);

  return (
    <div className="bg-black absolute z-[1000] top-4 left-4 flex items-center py-4 px-6 rounded-2xl">
      <div className="flex flex-row items-center space-x-4">
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 0 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <RiUser6Line />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 1 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <RiSearchLine />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 2 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <RiHome2Line />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 3 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <RiMovie2Line />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 4 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <RiSlideshow4Line />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
