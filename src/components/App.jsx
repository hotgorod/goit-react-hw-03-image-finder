import ImageGallery from "./ImageGallery/ImageGallery";
import SearchForm from "./SearchForm/SearchForm";
import SearchBar from "./Searchbar/Searchbar";
import { Component } from "react";

export class App extends Component {
  state = {
    searchText:'',
  };

  handleSearch = (searchText) => {
    this.setState({ searchText });
  }

  render() {
    return (
    <div>
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery searchText={this.state.searchText} />
    </div>
  );}
}

