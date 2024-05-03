import React, { Component } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import SearchBar from "./SearchBar";
import Slider3 from "./Slider3";

const ResponsivePlayer = ({ type }) => {
  // const [slides, setSlides] = useState([]);
  // useEffect(() => {
  //   setSelectedMovie(slides[0]);
  // }, [slides]);

  // useEffect(() => {
  //   CLIENT_API.getSimilarMovies("movie_id", (similarMovieData) => {
  //     setSlides(similarMovieData);
  //   });
  //   CLIENT_API.getSimilarShows("movie", (similarShowsData) => {
  //     setSlides(similarShowsData);
  //   });
  // }, []);

  return (
    <div className="bg-[#2a2a2a] flex flex-col h-screen space-y-4 p-8">
      {/* search,  */}
      <SearchBar />
      <div className="flex flex-row items-center space-x-4">
        {/* back arrow button */}
        <Link to="/home" className="text-white">
          <IoChevronBackOutline />
        </Link>
        <h1 className="text-[14px] font-inter font-bold text-white">
          Movie name
        </h1>
      </div>

      <div className="player-wrapper flex items-center justify-center h-[720px]">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=w_RDE7VK_RQ&ab_channel=DisneyIndi"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default ResponsivePlayer;
