import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({
  movie,
  selectedIndex,
  setSelectedIndex,
}) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (index < 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  /* This `useEffect` hook in the provided code snippet is setting up an event listener for keydown
  events on the document. When a keydown event occurs, it checks if the `selectedIndex` prop is
  equal to 1. If it is, it then checks the key that was pressed and performs different actions based
  on the key pressed. */
  useEffect(() => {
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
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, index]);

  return (
    <div className="relative w-full flex-[0.7] ">
      {movie && (
        <div className="w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt=""
            className="w-full aspect-[2.2] object-cover"
          />
          {/* title, desc, imdb, no. of streams, play and watch trailer button */}
          <div className="font-inter bg-gradient-to-b from-transparent to-black w-full text-white absolute bottom-0">
            <div className="ml-32 w-[400px] ">
              <h1 className="text-5xl py-12 font-semibold w-full uppercase">
                {movie.title}
              </h1>
              <p className="text-[16px] py-4 text-[#CDCDCD]">
                {movie.overview}
              </p>
              <p className="text-[10px] py-2">IMDB: {movie.vote_average}</p>
              <p className="text-[10px]">Streams: {movie.popularity}</p>
              <div className="flex flex-row space-x-4 py-8 ">
                <Link
                  to={`/watch/${movie.id}`}
                  className={`bg-[#D40000] text-white py-2 px-4 rounded-3xl ${
                    index === 0 ? "border-4 border-[#ffffff]" : ""
                  }`}
                >
                  Play
                </Link>
                <button
                  className={`bg-white text-black py-2 px-4 rounded-3xl ${
                    index === 1 ? "border-4 border-[#D40000]" : ""
                  }`}
                >
                  Watch Trailer
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
