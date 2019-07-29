import React, { Component } from "react";
import axios from "axios";
import MarketPostList from "../components/market/Post/List";

class Postings extends Component {
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
        {this.state.postings.length ? (
          <MarketPostList postings={this.state.postings} />
        ) : (
          <h1>There are no postings in your area</h1>
        )}
      </div>
    );
  }
}

export default Postings;
