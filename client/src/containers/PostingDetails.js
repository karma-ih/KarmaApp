import React, { Component } from "react";
import axios from "axios";
import MarketPostDetails from "../components/market/Post/Details";
import MessageList from "../components/market/Post/message/MessageList";

class PostingDetails extends Component {
  state = {
    title: "",
    description: "",
    karma: 0,
    street: "",
    zip: "",
    city: "",
    message: []
  };

  getPosting = () => {
    const { id } = this.props.match.params;

    return axios
      .get(`/api/postings/${id}`)
      .then(response => {
        const {
          title,
          description,
          karma,
          street,
          zip,
          city,
          message
        } = response.data;
        this.setState({
          title,
          description,
          karma,
          street,
          zip,
          city,
          message
        });
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
        <MessageList
          id={this.props.match.params}
          user={this.props.user}
          data={this.state.message}
          refreshData={this.getPosting}
        />
      </div>
    );
  }
}

export default PostingDetails;
