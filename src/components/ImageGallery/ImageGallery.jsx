import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

import { GalleryContainer } from './imageGallery.styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <GalleryContainer>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            galleryFormat={webformatURL}
            largeFormat={largeImageURL}
            toggleModal={toggleModal}
          />
        );
      })}
    </GalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  toggleModal: PropTypes.func.isRequired,
};
