import React from "react";
import { Link } from "react-router-dom";

const MarketPostBox = props => {
  const { title, karma, _id, description } = props.posting;
  return (
    <div className={props.className}>
      <Link to={`/market/${_id}`}>
        <h5>{title}</h5>
      </Link>
      <span style={{ color: "orange" }}>Karma: {karma}</span>
      <p>{description}</p>
    </div>
  );
};

export default MarketPostBox;
