import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./Searchbar/Searchbar";
import { Component } from "react";

export class App extends Component {
  state = {
    searchText: '',
    currentPage: 1,
  };

  handleSearch = searchText => {
    this.setState({ searchText });
    this.setState({ currentPage: 1 });
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));

    
  };
  render() {
    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        <ImageGallery
          currentPage={this.state.currentPage}
          searchText={this.state.searchText}
          onLoadMoreClick={this.onLoadMoreClick}
        />
      </div>
    );
  }
}

