import React, { Component } from "react";
import css from './Modal.module.css';

export default class Modal extends Component {
    render() {
        return (
          <div className={css.Overlay} onClick={this.props.onClick}>
            <div className={css.Modal}>
              <img src={this.props.imageURL} alt="" />
              
            </div>
          </div>
        );
    }
}