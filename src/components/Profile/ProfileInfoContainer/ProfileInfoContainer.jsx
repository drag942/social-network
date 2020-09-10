import React from 'react';
import styles from './ProfileInfo.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoEditForm from "./ProfileInfoEditForm/ProfileInfoEditForm";
import {useDispatch} from "react-redux";
import {updateProfileInfo} from "../../../redux/profileReducer";

const ProfileInfoContainer = ({profile, isAuthUser}) => {

    const [isEditable, setEditable] = React.useState(false);
    const dispatch = useDispatch();

    const onSubmit = (profile) => {
        dispatch(updateProfileInfo(profile));
    };

    const editButtonHandler = () => {
        setEditable(prev => !prev);
    };


    return (
        <div className={styles.container}>
            {isEditable ?
                    <ProfileInfoEditForm setEditable={setEditable} initialValues={profile} onSubmit={onSubmit}/> :
                <ProfileInfo profile={profile} isAuthUser={isAuthUser} editButtonHandler={editButtonHandler}/>
            }
        </div>
    );
};


export default ProfileInfoContainer;