import { useEffect, useState } from "react";
import { RxPlus } from "react-icons/rx";
import { Link } from "react-router-dom";

const Hero = ({ movie, selectedIndex, setSelectedIndex }) => {
  const [index, setIndex] = useState(-1);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => (prevIndex - 1) % 2);
    }
  };

  const handleNext = () => {
    if (index < 1) {
      setIndex((prevIndex) => (prevIndex + 1) % 2);
    }
  };
  console.log("index: ", index);
  /* This `useEffect` hook in the provided code snippet is setting up an event listener for keydown
  events on the document. When a keydown event occurs, it checks if the `selectedIndex` prop is
  equal to 1. If it is, it then checks the key that was pressed and performs different actions based
  on the key pressed. */
  useEffect(() => {
    if (selectedIndex === 1) {
      setIndex(0);
    }
  }, [selectedIndex]);
  const handleKeyDown = (e) => {
    if (selectedIndex === 1) {
      switch (e.key) {
        case "ArrowUp":
          setSelectedIndex(0);
          break;
        case "ArrowDown":
          setSelectedIndex(2);
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
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <div className="relative w-full flex-[0.7] font-poppins h-screen">
      {movie && (
        <div className="w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt=""
            className="w-full aspect-[2.2] object-cover"
          />
          {/* title, desc, imdb, no. of streams, play and watch trailer button */}
          <div className=" bg-gradient-to-b from-transparent to-[#0F1014] w-full h-auto text-white absolute bottom-0">
            <div className="ml-32 w-[30%] mb-16 ">
              <h1 className="text-5xl font-semibold w-full uppercase">
                {movie.title}
              </h1>
              <p className="text-[18px] py-4 text-[#CDCDCD]">
                {movie.overview}
              </p>
              <p className="text-[12px] py-2">IMDB: {movie.vote_average}</p>
              <p className="text-[12px]">Streams: {movie.popularity}</p>
              <div className="flex flex-row space-x-8 py-8 text-xl">
                <Link
                  to={`/watch/${movie.id}`}
                  className={`bg-white text-black font-bold p-2 w-[100%] flex items-center justify-center rounded-xl ${
                    index === 0
                      ? "transform scale-110 transition-all duration-500 ease-in-out"
                      : ""
                  }`}
                >
                  Play
                </Link>
                <button
                  className={`bg-[#373737] text-white p-2 px-4 rounded-xl ${
                    index === 1
                      ? "bg-[#545454] transform scale-110 transition-all duration-500 ease-in-out"
                      : ""
                  }`}
                >
                  <RxPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
