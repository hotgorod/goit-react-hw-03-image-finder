import ImageGallery from "./ImageGallery/ImageGallery";
import SearchForm from "./SearchForm/SearchForm";
import SearchBar from "./Searchbar/Searchbar";
import { Component } from "react";
import Modal from "./Modal/Modal";

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

