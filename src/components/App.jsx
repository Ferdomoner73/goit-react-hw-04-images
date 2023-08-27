import { useState, useEffect } from 'react';

import { css, Global } from '@emotion/react';
import modernNormalize from 'modern-normalize';

import { Container, ModalImg, NoImagesAlert } from './app.styled';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

import { fetchData } from '../api/search';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [chosenImg, setChosenImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isNothing, setIsNothing] = useState(false);
  const [tipeOfLoading, setTipeOfLOading] = useState(null);

  useEffect(() => {
    if (images.length <= 0) return;

    if (images.length > 1) {
      setIsNothing(false);
    }
  }, [images]);

  useEffect(() => {
    const saveData = async () => {
      try {
        const response = await fetchData(searchValue, page);
        if (response.hits.length === 0) {
          setIsLoading(false);
          setIsNothing(true);
        } else {
          const filteredImages = response.hits.map(obj => ({
            id: obj.id,
            webformatURL: obj.webformatURL,
            largeImageURL: obj.largeImageURL,
          }));

          setImages(prevState => [...prevState, ...filteredImages]);
          setPage(prevState => prevState + 1);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchValue !== '' && tipeOfLoading !== null)
      switch (tipeOfLoading) {
        case 'submit':
          saveData();
          setTipeOfLOading(null);
          break;
        case 'load-more':
          saveData();
          setTipeOfLOading(null);
          break;
        default:
          return;
      }
  }, [searchValue, page, tipeOfLoading]);

  useEffect(() => {
    if (isLoading) return;

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [isLoading]);

  const handleModalClick = e => {
    e.stopPropagation();
  };

  const handleOpenModal = currentImg => {
    setIsShowModal(true);
    setChosenImg(currentImg);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleEscape = e => {
    if (e.key === 'Escape') {
      setIsShowModal(false);
    }
  };

  const onSubmit = value => {
    setSearchValue(value.searchField);

    if (
      value.searchField.trim() === '' ||
      searchValue.trim() === value.searchField.trim()
    ) {
      return;
    }

    setPage(1);
    setImages([]);
    setIsLoading(true);
    setTipeOfLOading('submit');
  };

  const handleClickLoadMore = () => {
    setIsLoading(true);
    setTipeOfLOading('load-more');
  };

  return (
    <Container>
      <Global
        styles={css`
          ${modernNormalize}
        `}
      />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} toggleModal={handleOpenModal} />
      {images.length > 0 && isLoading === false && (
        <Button onClick={handleClickLoadMore} />
      )}
      {isLoading && <Loader />}
      {isNothing && !isLoading && (
        <NoImagesAlert>Nothing was found</NoImagesAlert>
      )}
      {isShowModal && (
        <Modal
          isShowModal={isShowModal}
          closeModal={handleCloseModal}
          escapeModal={handleEscape}
          clickOnModal={handleModalClick}
        >
          <ModalImg src={chosenImg} alt={'Chosen one'} />
        </Modal>
      )}
    </Container>
  );
};
