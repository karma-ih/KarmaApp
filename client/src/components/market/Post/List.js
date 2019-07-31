import React from "react";
import MarketPostBox from "./Box";

const MarketPostList = props => {
  // console.log(props.search);

  return (
    <>
      {/* {props.postings.length > 0 && <h2>Marketplace:</h2>} */}

      {props.search
        ? props.postings
            .filter(posting =>
              posting.description
                .toLowerCase()
                .includes(props.search.toLowerCase())
            )
            .map(posting => {
              return (
                <MarketPostBox
                  className={props.className}
                  posting={posting}
                  key={posting._id}
                />
              );
            })
        : props.postings.map(posting => {
            return (
              <MarketPostBox
                className={props.className}
                posting={posting}
                key={posting._id}
              />
            );
          })}
    </>
  );
};

export default MarketPostList;
