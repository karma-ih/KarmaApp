import React, { Component } from "react";
import axios from "axios";
import MarketPostList from "../components/market/Post/List";

class MarketPlaceCarousel extends Component {
  state = {
    postings: [],
    postings_applicant: [],
    postings_otherParty: []
  };

  getData = () => {
    axios
      .get(`/api/postings?user=${this.props.user._id}`)
      .then(response => {
        this.setState({
          postings: response.data.postings,
          postings_applicant: response.data.postings_applicant,
          postings_otherParty: response.data.postings_otherParty
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
          <MarketPostList
            className="card"
            postings={[
              ...this.state.postings,
              ...this.state.postings_applicant,
              ...this.state.postings_otherParty
            ]}
          />
        </div>
        <h1>My Postings</h1>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList className="card" postings={this.state.postings} />
        </div>

        <h1>Postings I'm Applying</h1>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList
            className="card"
            postings={this.state.postings_applicant}
          />
        </div>
        <h1>Postings I'm Handling</h1>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList
            className="card"
            postings={this.state.postings_otherParty}
          />
        </div>
      </div>
    );
  }
}

export default MarketPlaceCarousel;
