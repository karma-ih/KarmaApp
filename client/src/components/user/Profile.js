import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MarketPostList from "../market/Post/List";
import axios from "axios";

class Profile extends React.Component {
  state = {
    postings: [],
    postings_applicant: []
  };

  getData = () => {
    axios
      .get(`/api/postings?user=${this.props.user._id}`)
      .then(response => {
        this.setState({
          postings: response.data.postings,
          postings_applicant: response.data.postings_applicant
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
    // console.log(this.props.user);
    // console.log(this.state.postings);

    const { email, phoneNumber, imageUrl } = this.props.user;
    const { street, city, postalCode, country } = this.props.user.address;
    return (
      <>
        <img src={imageUrl} alt="user image" />
        <p> Email: {email}</p>
        <p> Tel.: {phoneNumber}</p>
        <h2>Address:</h2>
        <p>Street:{street}</p>
        <p>City: {city}</p>
        <p>Zip: {postalCode}</p>
        <p>Country: {country}</p>
        <Link to="/profile/edit">
          <Button>Edit User Information</Button>
        </Link>

        {/* {this.props.user._id !== this.state.creator._id && (
          <Button onClick={this.applyPosting}>Apply</Button>
        )} */}
        <div>CREATOR</div>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList className="card" postings={this.state.postings} />
        </div>
        <div>APPLICANT</div>
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList
            className="card"
            postings={this.state.postings_applicant}
          />
        </div>
      </>
    );
  }
}

export default Profile;
