
import React, { Component } from "react";
import { fetchImages } from "image-api/Api";
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  borderRadius: '10px',
  position: 'left-top',
  width: '300px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
  info: {
    background: '#f2e230',
    textColor: '#00f'
  },
});

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isModalOpen: false,
    isLoading: false,
    error: null,
    loadMore: false,
    totalPages: 1,
    activeImage: null,
  };

  fetchAllImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState(prevState => ({ isLoading: true }));
      if (!query) return;

      const images = await fetchImages(query, page);
      const pagesCount = Math.ceil(images.totalHits / 12);

      this.setState(prevState => ({
        totalPages: pagesCount,
        images: page === 1 ? images.hits : prevState.images.concat(images.hits),
        loadMore: page < pagesCount,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      isLoading: true,
      page: prevState.page + 1,
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    const search = event.currentTarget.elements.search.value;
    if (!search.trim()) {
      Notify.info('Please enter a search query');
    } else {
      try {
        this.setState({ query: search, page: 1, isLoading: true });
        const images = await fetchImages(search, 1);
        const pagesCount = Math.ceil(images.totalHits / 12);

        if (images.totalHits === 0) {
          Notify.info('No images found for your query');
        } else {
          this.setState(prevState => ({
            totalPages: pagesCount,
            images: images.hits,
            loadMore: 1 < pagesCount,
            isLoading: false,
          }));
        }
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      }
    }
  };

 openModal = selectedImage => {
  this.setState({ activeImage: selectedImage, isModalOpen: true });
};


  closeModal = () => {
    this.setState({ activeImage: null, isModalOpen: false });
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchAllImages();
    }
  }

  render() {
    const { isLoading, query, images, loadMore, isModalOpen, activeImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {query && (
          <>
            <ImageGallery images={images} onImageClick={this.openModal} />
            {loadMore && <Button onLoadMore={this.onLoadMore} />}
          </>
        )}
        {isModalOpen && (
          <Modal image={activeImage} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}

