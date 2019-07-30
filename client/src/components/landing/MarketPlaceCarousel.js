import React, { Component } from "react";
import axios from "axios";
import MarketPostList from "../market/Post/List";

class MarketPlaceCarousel extends Component {
  state = {
    postings: []
  };

  getData = () => {
    axios
      .get("/api/postings")
      .then(response => {
        this.setState({
          postings: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <h1>Marketplace:</h1>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList className="card" postings={this.state.postings} />
        </div>
      </div>
    );
  }
}

export default MarketPlaceCarousel;
