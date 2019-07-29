import React, { Component } from "react";
import axios from "axios";
import MarketPostDetails from "../components/market/Post/Details";

class PostingDetails extends Component {
  state = {
    title: "",
    description: "",
    karma: 0,
    street: "",
    zip: "",
    city: ""
  };

  getPosting = () => {
    const { id } = this.props.match.params;

    return axios
      .get(`/api/postings/${id}`)
      .then(response => {
        const { title, description, karma, street, zip, city } = response.data;
        this.setState({ title, description, karma, street, zip, city });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getPosting();
  }

  render() {
    return (
      <div>
        <MarketPostDetails details={this.state} />
      </div>
    );
  }
}

export default PostingDetails;
