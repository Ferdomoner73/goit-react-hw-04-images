import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ escapeModal, closeModal, clickOnModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', escapeModal);
    return () => window.removeEventListener('keydown', escapeModal);
  }, [escapeModal]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalContainer onClick={clickOnModal}>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.porpTypes = {
  escapeModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  clickOnModal: PropTypes.func.isRequired,
};
