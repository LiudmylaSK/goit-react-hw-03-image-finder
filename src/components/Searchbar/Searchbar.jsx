import css from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';

    export const Searchbar = ({ onSubmit }) => {
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={onSubmit}>
                       <input
                        className={css.searchFormInput}
                        type="text"
                        name='search'
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    
                    <button type="submit" className={css.searchFormBtn}>
                        <span ><FcSearch className={css.searchFormBtnLabel}/></span>
                    </button>

                 
                </form>
            </header>
        );
    };