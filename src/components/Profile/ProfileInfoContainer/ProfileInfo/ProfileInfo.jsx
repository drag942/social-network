import React from 'react';
import Paper from "@material-ui/core/Paper";
import styles from "../ProfileInfo.module.css";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import VkIcon from "../../../../assets/VkIcon";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";
import TwitterIcon from "@material-ui/icons/Twitter";
import CreateIcon from "@material-ui/icons/Create";

const ProfileInfo = ({profile, isAuthUser, editButtonHandler}) => {
    return (
        <>
            {isAuthUser && <div className={styles.editButton}><IconButton onClick={editButtonHandler}><CreateIcon/></IconButton></div>}
            <Paper className={styles.infoItem}>
                <Typography className={styles.title} variant={'h6'}>{`About ${isAuthUser ? `me` : profile.fullName}`}</Typography>
                <div className={styles.description}>
                    <Typography variant={'subtitle2'}>
                        {profile.aboutMe ? profile.aboutMe : 'Still nothing'}
                    </Typography>
                </div>
            </Paper>
            <Paper className={styles.infoItem}>
                <Typography className={styles.title} variant={'h6'}>{'Professional Skills'}</Typography>
                <div className={styles.description}>
                    <Typography variant={'subtitle2'}>
                        {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'No skills'}
                    </Typography>
                </div>
            </Paper>
            <Paper className={styles.infoItem}>
                <Typography className={styles.title} variant={'h6'}>{`${isAuthUser ? `My` : profile.fullName} contacts`}</Typography>
                <div className={styles.description}>
                    <Contacts contacts={profile.contacts}/>
                </div>
            </Paper>
        </>
    );
};

const Contacts = ({contacts}) => {

    return (
        <div className={styles.contacts}>
            {Object.keys(contacts).map(contactKey => {
                const isEmptyContactValue = contacts[contactKey] === null || contacts[contactKey] === '';

                return <IconButton
                    color='primary'
                    key={contactKey}
                    disabled={isEmptyContactValue}
                    href={isEmptyContactValue ? '#' : contacts[contactKey]}
                >
                    {renderIcon(contactKey, isEmptyContactValue)}
                </IconButton>
            })}
        </div>
    )
};

const renderIcon = (param, isDisabled) => {
    switch (param) {
        case 'facebook': return <FacebookIcon/>;
        case 'website': return <LanguageIcon/>;
        case 'vk': return <VkIcon/>;
        case 'instagram': return <InstagramIcon color={isDisabled ? 'disabled' : 'secondary'}/>;
        case 'youtube': return <YouTubeIcon color={isDisabled ? 'disabled' : 'error'}/>;
        case 'github' : return <GitHubIcon className={!isDisabled && styles.gitHubIcon}/>;
        case 'mainLink': return <LinkIcon/>;
        case 'twitter': return <TwitterIcon className={!isDisabled && styles.twitterIcon}/>;
        default: return <LanguageIcon/>;
    }
};



export default ProfileInfo;