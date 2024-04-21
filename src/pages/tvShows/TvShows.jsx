import React from "react";
import { useEffect, useState } from "react";
import Slider3 from "../../components/Slider3";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import { navbarIcons } from "../../data/db";
import LeftNavBar from "../../components/LeftNavBar";

const TvShows = () => {
  const [slides, setSlides] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(slides[0]);
  const [navIcons, setNavIcons] = useState([]);

  useEffect(() => {
    setSelectedMovie(slides[0]);
  }, [slides]);
  useEffect(() => {
    window.CLIENT_API.getMovieData("tv", (tvData) => {
      setSlides(tvData);
    });
  }, []);
  console.log("selected index: ", selectedIndex);

  useEffect(() => {
    setNavIcons(navbarIcons);
  }, []);
  return (
    <div>
      <LeftNavBar slides={navIcons} />
      <Hero
        movie={selectedMovie}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Slider3
        slides={slides}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setSelectedMovie={setSelectedMovie}
      />
    </div>
  );
};

export default TvShows;
