import { PureComponent } from 'react';

import { css, Global } from '@emotion/react';
import modernNormalize from 'modern-normalize';

import { Container, ModalImg, NoImagesAlert } from './app.styled';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

import { fetchData } from '../api/search';

const INITIAL_VALUES = {
  searchValue: '',
  page: 1,
  images: [],
  chosenImg: null,
  isLoading: false,
  isShowModal: false,
  isNothing: false,
  activeImgUrl: null,
};

export class App extends PureComponent {
  state = {
    ...INITIAL_VALUES,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, images } = this.state;

    if (
      prevState.searchValue.trim() !== searchValue.trim() &&
      searchValue !== ''
    ) {
      this.setState({ images: [] });
      this.saveData();
    }

    if (images.length > 1) {
      this.setState({ isNothing: false });
    }

    if (prevState.isLoading !== this.state.isLoading) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  handleModalClick = e => {
    e.stopPropagation();
  };

  handleOpenModal = currentImg => {
    this.setState({ isShowModal: true, chosenImg: currentImg });
  };

  handleCloseModal = e => {
    this.setState({ isShowModal: false });
  };

  handleEscape = e => {
    if (e.key === 'Escape') {
      this.setState({ isShowModal: false });
    }
  };

  saveData = async () => {
    const { searchValue, page } = this.state;

    try {
      const response = await fetchData(searchValue, page);
      if (response.hits.length === 0) {
        this.setState({
          isLoading: false,
          isNothing: true,
        });
      } else {
        const filteredImages = response.hits.map(obj => ({
          id: obj.id,
          webformatURL: obj.webformatURL,
          largeImageURL: obj.largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...filteredImages],
          page: prevState.page + 1,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onSubmit = value => {
    this.setState({
      searchValue: value.searchField,
    });

    if (
      value.searchField.trim() === '' ||
      this.state.searchValue.trim() === value.searchField.trim()
    )
      return;

    this.setState({ isLoading: true, page: 1 });
  };

  handleClickLoadMore = async () => {
    this.setState({ isLoading: true });
    this.saveData();
  };

  render() {
    const { images, isLoading, isShowModal, chosenImg, isNothing } = this.state;

    return (
      <Container>
        <Global
          styles={css`
            ${modernNormalize}
          `}
        />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} toggleModal={this.handleOpenModal} />
        {images.length > 0 && isLoading === false && (
          <Button onClick={this.handleClickLoadMore} />
        )}
        {isLoading && <Loader />}
        {isNothing && !isLoading && (
          <NoImagesAlert>Nothing was found</NoImagesAlert>
        )}
        {isShowModal && (
          <Modal
            isShowModal={isShowModal}
            closeModal={this.handleCloseModal}
            escapeModal={this.handleEscape}
            clickOnModal={this.handleModalClick}
          >
            <ModalImg src={chosenImg} alt={'Chosen one'} />
          </Modal>
        )}
      </Container>
    );
  }
}
