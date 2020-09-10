import React from 'react';
import LoadSvg from './91.svg'
import classes from './Preloader.module.css'

const PreLoader = () => {
    return (
       <div className={classes.preloader}><img src={LoadSvg}/></div>
    );
};

export default PreLoader;