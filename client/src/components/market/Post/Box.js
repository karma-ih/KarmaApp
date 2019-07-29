import React from "react";
import { Link } from "react-router-dom";

const MarketPostBox = props => {
  const { title, karma, _id } = props.posting;
  return (
    <div>
      <Link to={`/market/${_id}`}>
        {title} {karma}
      </Link>
    </div>
  );
};

export default MarketPostBox;
