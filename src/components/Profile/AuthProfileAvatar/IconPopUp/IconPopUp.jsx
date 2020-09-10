import React from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import classes from './IconPopUp.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";

const IconPopUp = ({isUpdatingUserPhoto}) => {
    return (
        <div className={classes.iconContainer}>
            {isUpdatingUserPhoto ? <CircularProgress className={classes.iconProgress}/> : <AddAPhotoIcon className={classes.icon}/>}
        </div>
    );
};

export default IconPopUp;