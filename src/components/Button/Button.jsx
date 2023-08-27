import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore, ButtonContainer } from './button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonContainer>
      <ButtonLoadMore
        type="button"
        onClick={onClick}
        aria-label="button-load-more"
      >
        Load More
      </ButtonLoadMore>
    </ButtonContainer>
  );
};

Button.propStypes = {
  onClick: PropTypes.func.isRequired,
};
