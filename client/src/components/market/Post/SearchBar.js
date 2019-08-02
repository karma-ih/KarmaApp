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
      <div id="searchcomp">
        <h1>Marketplace</h1>
        <input
          name="searchInput"
          type="text"
          value={this.props.searchInput}
          onChange={this.handleSearch}
          className="searchInput"
          placeholder="search the marketplace"
        />
        <button size="sm" className="example_c" onClick={this.props.sortByName}>
          Sort Name
        </button>
        <button
          size="sm"
          className="example_c"
          onClick={this.props.sortByKarma}
        >
          Sort Karma
        </button>
      </div>
    );
  }
}

export default SearchBar;
