import React, { Component } from "react";
import css from './Modal.module.css';


export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKey);
  }
  onOverlayClick = () => {
    this.props.onClose();
  };

  onEscapeKey = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={css.Overlay} onClick={this.onOverlayClick}>
        <div className={css.Modal}>
          <img src={this.props.imageURL} alt="" />
        </div>
      </div>
    );
  }
}