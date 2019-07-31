import React from "react";
import LandingCarousel from "../components/landing/LandingCarousel";
import SimpleForm from "../components/chatbot/Chatbot";
import MarketPlaceCarousel from "../components/landing/MarketPlaceCarousel";

const Home = () => {
  return (
    <div>
      <div
        style={{
          fontSize: "2rem",
          padding: "30px"
          
        }}
        className="landingOne"
      >
        <h3>Fuero Karma Kultur</h3>
        <h6>
          
            Fuero: [Latin] a forum, an open space used as market, tribunal and meeting place. </h6>
        <h6>  Karma: [Sankskrit] means action, work or deed. It also refers to the spiritual principle of cause and effect. </h6>
<h6>
  Kultur: Manifestations of human intellectual achievement regarded collectively.
       
       </h6>
      </div>
      <div>
        <LandingCarousel />
      </div>
      <MarketPlaceCarousel />
    </div>
  );
};

export default Home;
