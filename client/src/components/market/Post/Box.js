import React from "react";
import { Link } from "react-router-dom";

const MarketPostBox = props => {
  const { title, karma, _id, description } = props.posting;
  // console.log(props);
  return (
    <div className={props.className}>
      <div style={{ backgroundColor: "black" }}>
        <img
          src="/karmalogo.png"
          width="45"
          height="45"
          style={{ margin: "10" }}
          className="d-inline-block align-top"
          alt="KarmaApp logo"
        />
        <span style={{ color: "orange", margin: "auto 0" }}>{karma}</span>
      </div>

      <p>{description}</p>
      <p>{}</p>
      <Link to={`/market/${_id}`}>
        <div class="button_cont" align="center">
          <a
            class="example_b"
            href="add-website-here"
            target="_blank"
            rel="nofollow noopener"
          >
            View
          </a>
        </div>
      </Link>
    </div>
  );
};

export default MarketPostBox;
