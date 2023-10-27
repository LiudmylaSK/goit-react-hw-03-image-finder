import css from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
     document.addEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'auto'; 
  }

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={css.overlay} onClick={this.onOverlayClick}>
        <div className={css.modal}>
          <img className={css.largeImage} src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}
