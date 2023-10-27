import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
    return (
        <div>
            <button type='button' onClick={onLoadMore} className={css.btnLoadMore}>Load more...</button>
        </div>
    )
}