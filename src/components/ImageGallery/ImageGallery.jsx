import { Component } from 'react';
import css from './ImageGallery.module.css';
import { getImages } from 'services/getImages';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

class ImageGallery extends Component {
  state = {
    images: null,
    isLoading: false,
    error: false,
    errorMessage: 'Something went wrong! Try again later',
    showModal: false,
    modalImageURL: '',
    currentPage: 1,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({
        isLoading: true,
        error: false,
        errorMessage: 'Something went wrong! Try again later',
        
        images: null,
      });
      
    }
    if (
      prevProps.searchText !== this.props.searchText ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.loadMoreImages(this.props.searchText, this.props.currentPage);
    }
  }
  loadMoreImages = (searchText, page) => {
    getImages(searchText, page)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(new Error('ErrorDetected'));
        }
      })
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ error: true, errorMessage: 'No results found' });
        } else {
          this.setState(prevState => ({
            images: Array.isArray(prevState.images)
              ? [...prevState.images, ...data.hits]
              : data.hits,
            totalImages: data.total,
            // currentPage: prevState.currentPage + 1,
          }));
        }
      })
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = imageURL => {
    this.setState({ showModal: true, modalImageURL: imageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImageURL: '' });
  };

  onImageClick = imageURL => {
    this.openModal(imageURL);
  };

  

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        {error && (
          <div>
            <p>{this.state.errorMessage}</p>
          </div>
        )}
        {isLoading && (
          <div className={css.loader}>
            <p>Loading...</p>
          </div>
        )}
        <ul className={css.ImageGallery}>
          {images &&
            images.map(el => {
              return (
                <ImageGalleryItem
                  key={el.id}
                  src={el.webformatURL}
                  alt={el.tags}
                  onClick={() => this.onImageClick(el.largeImageURL)}
                />
              );
            })}
        </ul>
        {this.state.showModal && (
          <Modal
            imageURL={this.state.modalImageURL}
            onClose={this.closeModal}
          />
        )}
        {this.state.totalImages > (this.state.images || []).length && (
          <Button onClick={this.props.onLoadMoreClick} />
        )}
      </>
    );
  }
}

export default ImageGallery;
