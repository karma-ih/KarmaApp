import React, { Component } from "react";
import axios from "axios";
import MarketPostList from "../components/market/Post/List";
import SearchBar from "../components/market/Post/SearchBar";
import Container from "react-bootstrap/Container";

class Postings extends Component {
  state = {
    postings: [],
    searchInput: ""
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

  onSearchChange = (name, value) => {
    this.setState({
      [name]: value
    });

    const { searchInput } = this.state;
    let filteredPostings = [...this.state.postings];
    filteredPostings = filteredPostings.filter(posting => {
      return posting.title.toLowerCase().includes(searchInput.toLowerCase());
    });

    this.setState({
      search: value
    });
  };

  sortByName = () => {
    const postingsCopy = [...this.state.postings];
    const sortedPostings = postingsCopy.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.setState({ postings: sortedPostings });
  };

  sortByKarma = () => {
    const postingsCopy = [...this.state.postings];
    const sortedPostings = postingsCopy.sort((a, b) => b.karma - a.karma);
    this.setState({ postings: sortedPostings });
  };

  render() {
    return (
      <div>
        {this.state.postings.length ? (
          <div>
            <SearchBar
              onSearchChange={this.onSearchChange}
              searchInput={this.state.searchInput}
              checked={this.state.checked}
              sortByName={this.sortByName}
              sortByKarma={this.sortByKarma}
            />
            <div className="flex-container-market">
              <MarketPostList
                search={this.state.searchInput}
                postings={this.state.postings}
                className="card wrap market-card"
              />
            </div>
          </div>
        ) : (
          <h1>There are no postings in your area</h1>
        )}
      </div>
    );
  }
}

export default Postings;
