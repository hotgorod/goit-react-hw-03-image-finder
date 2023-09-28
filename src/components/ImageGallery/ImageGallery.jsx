import { Component } from 'react';
import css from './ImageGallery.module.css'

class ImageGallery extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    console.log('ghbdsn');
    if (prevProps.searchText !== this.props.searchText) {
      // fetch
    }
  }
  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {/* <li>Что то тут такое</li>
          <li>Что то тут такое</li>
          <li>Что то тут такое</li>
          <li>Что то тут такое</li> */}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
