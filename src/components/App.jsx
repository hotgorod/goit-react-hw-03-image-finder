import ImageGallery from "./ImageGallery/ImageGallery";
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
        <SearchBar handleSearch={this.handleSearch} />
        <ImageGallery searchText={this.state.searchText} />
        
    </div>
  );}
}

