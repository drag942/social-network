import React, {useState} from 'react';
import classes from "../Profile.module.css";
import {Avatar} from "@material-ui/core";
import IconPopUp from "./IconPopUp/IconPopUp";

const AuthProfileAvatar = ({onMainPhotoSelected, profile, styles, isUpdatingUserPhoto}) => {
    const [isShowPhotoIcon, setIsShowPhotoIcon] = useState(false);

    const onFocusPhotoInputHandler = () => {
        setIsShowPhotoIcon(true);
    };

    const onUnFocusPhotoInputHandler = () => {
        setIsShowPhotoIcon(false);
    };

    const onChangeHandler = (e) => {
        onMainPhotoSelected(e);
        setIsShowPhotoIcon(false);
    };

    const isShowPopUp = isShowPhotoIcon || isUpdatingUserPhoto;

    return (
        <div className={classes.authAvatarContainer}>
            <input
                accept="image/*"
                className={classes.inputPhoto}
                id="contained-avatar-file"
                multiple
                type="file"
                onChange={onChangeHandler}
                disabled={isUpdatingUserPhoto}
            />
            <label className={classes.labelAvatar}
                   htmlFor="contained-avatar-file"
                   onMouseEnter={onFocusPhotoInputHandler}
                   onMouseLeave={onUnFocusPhotoInputHandler}
            >
                <Avatar alt={profile.fullName} className={styles.avatar} src={profile.photos.large}/>
                {isShowPopUp && <IconPopUp isUpdatingUserPhoto={isUpdatingUserPhoto}/>}
            </label>
        </div>
    );
};

export default AuthProfileAvatar;