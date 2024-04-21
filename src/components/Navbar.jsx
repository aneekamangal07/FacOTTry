import { useState, useEffect, KeyboardEvent } from "react";
import { IoIosTrendingUp, IoMdSearch } from "react-icons/io";
import { BiCameraMovie } from "react-icons/bi";
import { MdOutlineMovie, MdOutlineHome } from "react-icons/md";

const Navbar = ({
  selectedIndex,
  setSelectedIndex,
  isToggled,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDownNavbar = (event) => {
      if (selectedIndex === 0 && !isToggled) {
        if (event.key === "ArrowDown") {
          setSelectedIndex(1);
        } else if (event.key === "ArrowRight") {
          setFocusedIndex((prevIndex) => (prevIndex + 1) % 5);
        } else if (event.key === "ArrowLeft") {
          setFocusedIndex((prevIndex) => (prevIndex - 1 + 5) % 5);
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
          <IoMdSearch />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 1 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <MdOutlineHome />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 2 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <IoIosTrendingUp />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 3 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <BiCameraMovie />
        </a>
        <a
          href="#"
          className={`text-white ${
            focusedIndex === 4 ? "bg-gray-500 rounded-full p-2" : ""
          }`}
        >
          <MdOutlineMovie />
        </a>
      </div>
    </div>
  );
};

export default Navbar;