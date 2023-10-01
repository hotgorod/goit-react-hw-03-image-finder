import React, { Component } from "react";
import css from './ImageGalleryItem.module.css'

export default class ImageGalleryItem extends Component{
    render(){
        return (
          <li key={this.props.key}>
            <img
              src={this.props.src}
              alt={this.props.alt}
              onClick={this.props.onClick}
            />
          </li>
        );
    }
}