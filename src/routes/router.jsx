import { Routes, Route, Navigate } from "react-router-dom";
import MovieUI from "../pages/movie/MovieUI";
import Error from "../components/Error";
import TvShows from "../pages/tvShows/TvShows";
import InitialButton from "../components/InitialButton";
import Home from "../pages/Home";
import Player from "../components/Player";

const MainRouter = () => {
  return (
    <Routes>
      {/* AUTH */}
      {/* <Route path="/logout" element={<Logout />} />
      <Route path="/forgotpass" element={<ForgotPassword_1 />} />
      <Route path="/forgotpass_2" element={<ForgotPassword_2 />} />
      <Route path="/forgotpass_3" element={<ForgotPassword_3 />} />
      <Route path="/changepass" element={<ChangePassword />} />
      <Route path="/register/email" element={<Register_1/>} />
      <Route path="/register/otp" element={<Register_2/>} />
      <Route path="/register/pass" element={<Register_3/>} /> */}

      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shows" element={<TvShows />} />
      <Route path="/movies" element={<MovieUI />} />
      <Route path="/watch/:id" element={<Player />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default MainRouter;
