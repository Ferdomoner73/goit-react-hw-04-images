import React from 'react';
import PropTypes from 'prop-types';

import {
  GalleryItemContainer,
  GalleryItemImg,
  Button,
} from './imageGalleryItem.styled';

export const ImageGalleryItem = ({
  galleryFormat,
  toggleModal,
  largeFormat,
}) => {
  return (
    <GalleryItemContainer>
      <Button type="button" onClick={() => toggleModal(largeFormat)}>
        <GalleryItemImg src={galleryFormat} alt="" loading="lazy" />
      </Button>
    </GalleryItemContainer>
  );
};

ImageGalleryItem.propTypes = {
  galleryFormat: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  largeFormat: PropTypes.string.isRequired,
};
