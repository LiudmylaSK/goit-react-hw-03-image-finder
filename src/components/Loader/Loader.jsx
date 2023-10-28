import css from './Loader.module.css';
import { Vortex } from 'react-loader-spinner';

export const Loader = () => {
    return (
        
       <div className={css.loaderWrapper}>
      <div className={css.loader}>
        <Vortex
          visible={true}
          height="150"
          width="150"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'orange', 'yellow', 'green', 'blue', 'purple']}
        />
      </div>
    </div>
     
    );
};