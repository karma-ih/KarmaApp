import React from "react";
import LandingCarousel from "../components/landing/LandingCarousel";
import SimpleForm from "../components/chatbot/Chatbot";
import MarketPlaceCarousel from "../components/landing/MarketPlaceCarousel";
import ParticleComponent from "../components/ParticleComponent";

const Home = () => {
  return (
    <div>
      <ParticleComponent />
      <div
        style={{
          fontSize: "3rem",
          padding: "30px"
        }}
        className="landingOne"
      >
        <div className="landingText">
          <h3>Fuero Karma Kultur</h3>
          <h6>
            Fuero: [Latin] a forum, an open space used as market, tribunal and
            meeting place.
          </h6>
          <h6>
            Karma: [Sankskrit] means action, work or deed. It also refers to the
            spiritual principle of cause and effect.{" "}
          </h6>
          <h6>
            Kultur: Manifestations of human intellectual achievement regarded
            collectively.
          </h6>
        </div>
      </div>
      <div>
        <LandingCarousel />
      </div>
      <MarketPlaceCarousel />
    </div>
  );
};

export default Home;
