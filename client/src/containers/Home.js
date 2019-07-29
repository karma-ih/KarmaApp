import React from "react";
import LandingCarousel from "../components/landing/LandingCarousel";

const Home = () => {
  return (
    <div>
      <div
        style={{
          fontSize: "2rem",
          paddingTop: "100px"
        }}
        className="landingOne"
      >
        <h1>Welcome to Karma Coin</h1>
        <p>
          Karma coin is the first non-monetary pseudo-crypto coin, that is only
          powered by the community bla bla bla
        </p>
      </div>
      <div>
        <LandingCarousel />
      </div>
    </div>
  );
};

export default Home;
