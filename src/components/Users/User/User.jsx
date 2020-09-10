import React from 'react';
import styles from "../Users.module.css";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getIsFollowingInProgress} from "../../../redux/usersSelectors";
import {followUserAsyncAction, unFollowUserAsyncAction} from "../../../redux/usersReducer";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const User = ({id, name, photos, followed}) => {

    const isFollowingInProgress = useSelector(state => getIsFollowingInProgress(state));
    const dispatch = useDispatch();

    const followUser = (id) => {
       dispatch(followUserAsyncAction(id));
    };

    const unFollowUser = (id) => {
        dispatch(unFollowUserAsyncAction(id));
    };

    return (
        <Paper className={styles.userBlock}>
            <div className={styles.avatarBlock}><NavLink to={`/profile/${id}`}><Avatar src={photos.small != null && photos.small} className={styles.userAvatar}>{photos.small === null && name[0]}</Avatar></NavLink></div>
            <div className={styles.userInfoBlock}>
                <div className={styles.userName}>{name}</div>
                <div className={styles.buttonFollow}>
                    {followed ?
                        <Button
                            disabled={isFollowingInProgress.some(followId => followId === id)}
                            onClick={() => {unFollowUser(id)}}
                            color='secondary'
                        >
                            UNFOLLOW
                        </Button> :
                        <Button
                            disabled={isFollowingInProgress.some(followId => followId === id)}
                            onClick = {() => {followUser(id);}}
                            color='primary'
                        >
                            FOLLOW
                        </Button>}
                </div>
            </div>
        </Paper>
    );
};

export default User;