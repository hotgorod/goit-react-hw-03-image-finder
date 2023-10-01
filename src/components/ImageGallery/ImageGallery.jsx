import { Component } from 'react';
import css from './ImageGallery.module.css'
import { getImages } from 'services/getImages';
import Modal from 'components/Modal/Modal';

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
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKey);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState(prevState => ({
        isLoading: true,
        error: false,
        errorMessage: 'Something went wrong! Try again later',
        currentPage: 1, 
      }));
        
      

      getImages(this.props.searchText, this.state.currentPage)
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
              images: data.hits,
              
            }));
          }
        })
        .catch(() => this.setState({ error: true }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  openModal = imageURL => {
    this.setState({ showModal: true, modalImageURL: imageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImageURL: '' });
  };

  onImageClick = imageURL => {
    this.openModal(imageURL);
  };

  onOverlayClick = () => {
    this.closeModal();
  };

  onEscapeKey = event => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };
  onLoadMoreClick = () => {
      this.setState(
          prevState => ({
            isLoading: true,
            currentPage: prevState.currentPage + 1, // Увеличиваем номер текущей страницы
          }),
          () => {
            getImages(this.props.searchText, this.state.currentPage)
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  return Promise.reject(new Error('ErrorDetected'));
                }
              })
              .then(data => {
                if (data.hits.length === 0) {
                  this.setState({
                    error: true,
                    errorMessage: 'No results found',
                  });
                } else {
                  this.setState(prevState => ({
                    images: [...prevState.images, ...data.hits], // Добавляем новые фотографии к существующим
                    totalImages: data.total,
                  }));
                }
              })
              .catch(() => this.setState({ error: true }))
              .finally(() => this.setState({ isLoading: false }));
          }
        );
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
                <li key={el.id}>
                  <img
                    src={el.webformatURL}
                    alt={el.tags}
                    onClick={() => this.onImageClick(el.largeImageURL)}
                  />
                </li>
              );
            })}
        </ul>
        {this.state.showModal && (
          <Modal
            imageURL={this.state.modalImageURL}
            onClick={this.onOverlayClick}
          />
        )}
        <button type="button" onClick={this.onLoadMoreClick} >
          Load more
        </button>
      </>
    );
  }
}

export default ImageGallery;
