import React from "react";
import { Button } from "react-bootstrap";

class SearchBar extends React.Component {
  handleSearch = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.props.onSearchChange(name, value);
  };

  render() {
    return (
      <div>
        <h4>Search</h4>
        <input
          name="searchInput"
          type="text"
          value={this.props.searchInput}
          onChange={this.handleSearch}
        />
        <Button onClick={this.props.sortByName}>Sort By Name</Button>
        <Button onClick={this.props.sortByKarma}>Sort By Karma</Button>
      </div>
    );
  }
}

export default SearchBar;
