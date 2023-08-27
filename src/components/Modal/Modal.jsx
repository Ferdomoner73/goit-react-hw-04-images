import { Component } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.props.escapeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.escapeModal);
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <Overlay onClick={this.props.closeModal}>
        <ModalContainer onClick={this.props.clickOnModal}>
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.porpTypes = {
  escapeModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  clickOnModal: PropTypes.func.isRequired,
};
