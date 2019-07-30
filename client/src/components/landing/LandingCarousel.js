import React from "react";
import { Carousel } from "react-bootstrap";

const LandingCarousel = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <div
            style={{
              height: "50vh",
              backgroundColor: "black",
              paddingTop: "25px"
            }}
          >
            <i
              style={{ color: "white", fontSize: "5rem" }}
              className="fas fa-city"
            />
          </div>
          <Carousel.Caption>
            <h3>Join the community</h3>
            <p>Register now to take part in this amazing commnity of people!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              height: "50vh",
              backgroundColor: "black",
              paddingTop: "25px"
            }}
          >
            <i
              style={{ color: "white", fontSize: "5rem" }}
              className="fas fa-hands-helping"
            />
          </div>
          <Carousel.Caption>
            <h3>Discover Marketplace</h3>
            <p>
              Discover our marketplace where you can just hangout to collect
              karma or get your tasks done by using your karmapoints!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              height: "50vh",
              backgroundColor: "black",
              paddingTop: "25px"
            }}
          >
            <i
              style={{ color: "white", fontSize: "5rem" }}
              className="fas fa-comments"
            />
          </div>
          <Carousel.Caption>
            <h3>Post and comments</h3>
            <p>
              Start posting immediatly and enjoy the collecting and spending
              karma points!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default LandingCarousel;
