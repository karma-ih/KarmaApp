import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>
        Click <Link to="/projects">here</Link> to see the projects (need to be
        signed in)
      </h1>
    </div>
  );
};

export default Home;
