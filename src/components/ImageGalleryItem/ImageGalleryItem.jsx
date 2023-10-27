import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
    return (
        <li key={image.id} className={css.galleryItem}>
            <img src={image.webformatURL} alt={image.alt} className={css.galleryItemImg}
            onClick={() => onClick(image)}/>
        </li>
    );
};