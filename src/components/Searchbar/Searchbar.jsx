import { Formik, Form } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

import {
  SearchContainer,
  SearchLabel,
  SearchButton,
  SearchIcon,
  SearchInput,
} from './searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchContainer>
      <Formik
        initialValues={{
          searchField: '',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SearchLabel htmlFor="search">
            <SearchButton type="submit" aria-label="button-sumbit">
              <SearchIcon />
            </SearchButton>
            <SearchInput
              id="search"
              name="searchField"
              placeholder="Search images and photos"
            />
          </SearchLabel>
        </Form>
      </Formik>
    </SearchContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
