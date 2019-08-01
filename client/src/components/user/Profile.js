import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MarketPostList from "../market/Post/List";
import axios from "axios";
import Image from "react-bootstrap/Image";

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
        <div className="profile-card">
          <Image width="300" rounded src={imageUrl} alt="user image" />
          <p> Email: {email}</p>
          <p> Tel.: {phoneNumber}</p>
          <h2>Address:</h2>
          <p>Street:{street}</p>
          <p>City: {city}</p>
          <p>Zip: {postalCode}</p>
          <p>Country: {country}</p>
          <Link to="/profile/edit">
            <button className="example_c">Edit User Information</button>
          </Link>
        </div>

        {/* {this.props.user._id !== this.state.creator._id && (
          <Button onClick={this.applyPosting}>Apply</Button>
        )} */}
        {/* {this.state.postings.length > 0 && <div>CREATOR</div>}
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList className="card" postings={this.state.postings} />
        </div>
        {this.state.postings_applicant.length > 0 && <div>APPLICANT</div>}
        <div className="scrolling-wrapper-flexbox">
          <MarketPostList
            className="card"
            postings={this.state.postings_applicant}
          /> */}
        {/* </div> */}
      </>
    );
  }
}

export default Profile;
