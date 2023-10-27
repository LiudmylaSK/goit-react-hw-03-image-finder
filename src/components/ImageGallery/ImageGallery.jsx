import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
    if (images.length === 0) {
        return
    }
    return (
        <ul className={css.gallery}>
            {images.map(img => {
                return (
                    <ImageGalleryItem
                        key={img.id}
                        image={img}
                        onClick={onImageClick} />
                );
            })}
        </ul>
    );
   
};

