import React, { Component } from "react";
import axios from "axios";
import MarketPostDetails from "../components/market/Post/Details";
import MessageList from "../components/market/Post/message/MessageList";
import { Button } from "react-bootstrap";

class PostingDetails extends Component {
  state = {
    title: "",
    description: "",
    karma: 0,
    street: "",
    zip: "",
    city: "",
    creator: {},
    applicant: [],
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
          applicant,
          creator,
          message
        } = response.data;
        this.setState({
          title,
          description,
          karma,
          street,
          zip,
          creator,
          city,
          applicant,
          message
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  applyPosting = () => {
    const { id } = this.props.match.params;
    const user_id = this.props.user._id;

    return axios
      .post(`/api/postings/${id}/apply`, {
        _id: user_id
      })
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getPosting();
  }

  render() {
    console.log("userid", this.props.user._id);
    console.log("applicant", this.state.applicant._id);
    console.log("creator", this.state.creator._id);

    console.log(this.state.applicant);
    return (
      <div>
        <MarketPostDetails
          paramsId={this.props.match.params}
          details={this.state}
        />
        <MessageList
          id={this.props.match.params}
          user={this.props.user}
          data={this.state.message}
          refreshData={this.getPosting}
        />
        {!this.state.applicant.find(el => el._id === this.props.user._id) &&
          this.props.user._id !== this.state.creator._id && (
            <Button onClick={this.applyPosting}>Apply</Button>
          )}
      </div>
    );
  }
}

export default PostingDetails;

// this.props.user._id !== this.state.creator._id
