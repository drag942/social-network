import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";

import {CircularProgress, Grid, Avatar, Typography, makeStyles} from "@material-ui/core";
import {deepOrange} from "@material-ui/core/colors";

import {getAuthId} from "../../redux/authSelectors";
import {
    getIsUpdatingStatus, getIsUpdatingUserPhoto,
    getIsUpdatingUserProfile,
    getProfile,
    getProfileStatus
} from "../../redux/profileSelectors";
import {
    getUserStatusAsyncAction, setUserProfileAsyncAction,
    updatePhotoAsyncAction, updateUserStatusAsyncAction
} from "../../redux/profileReducer";
import classes from './Profile.module.css'
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import MyPosts from "./MyPosts/MyPosts";
import AuthProfileAvatar from "./AuthProfileAvatar/AuthProfileAvatar";
import ProfileInfoContainer from "./ProfileInfoContainer/ProfileInfoContainer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";



const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        backgroundColor: deepOrange[500],
    },
}));


const Profile = ({match}) => {

    const userId = parseInt(match.params.userId);

    const [tabValue, setTabValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setUserProfileAsyncAction(userId));
        dispatch(getUserStatusAsyncAction(userId));
    }, [dispatch, userId]);

    const styles = useStyles();

    const {authId, profile, isUpdatingStatus, status, isUpdatingUserProfile, isUpdatingUserPhoto} = useSelector(state => ({
        authId: getAuthId(state),
        profile: getProfile(state),
        isUpdatingStatus: getIsUpdatingStatus(state),
        status: getProfileStatus(state),
        isUpdatingUserProfile: getIsUpdatingUserProfile(state),
        isUpdatingUserPhoto: getIsUpdatingUserPhoto(state),
    }));


    const isAuthUser = authId === userId;
    const isEditable = isAuthUser && !isUpdatingStatus;

    const updateUserStatus = (status) => {
        dispatch(updateUserStatusAsyncAction(status))
    };

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length){
            dispatch(updatePhotoAsyncAction(e.target.files[0]));
        }
    };

    if (!profile || isUpdatingUserProfile) return <CircularProgress/>;

    return (
        <div className={classes.content}>
            <Grid container>
                <Grid item xs={2}>
                   {isAuthUser ?
                       <AuthProfileAvatar
                           onMainPhotoSelected={onMainPhotoSelected}
                           profile={profile}
                           styles={styles}
                           isUpdatingUserPhoto={isUpdatingUserPhoto}
                       /> :
                       <Avatar
                            alt={profile.fullName}
                            className={styles.avatar}
                            src={profile.photos.large}
                        />
                   }
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={'h5'}>{profile.fullName}</Typography>
                    <ProfileStatus isUpdatingStatus={isUpdatingStatus} updateUserStatus={updateUserStatus} isEditable={isEditable} status={status}/>
                </Grid>
            </Grid>
            <div className={classes.tab}>
                <TabContext value={tabValue}>
                    <Tabs value={tabValue} onChange={handleChangeTab} centered>
                        <Tab selected={true} label="Posts" value={'1'}/>
                        <Tab label="Profile Info" value={'2'}/>
                    </Tabs>
                    <TabPanel value='1'><MyPosts/></TabPanel>
                    <TabPanel value='2'> <ProfileInfoContainer profile={profile} isAuthUser={isAuthUser}/></TabPanel>
                </TabContext>
            </div>
        </div>
    );
};





export default compose(withRouter, withAuthRedirect)(Profile);