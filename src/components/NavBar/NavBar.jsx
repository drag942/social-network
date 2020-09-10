import React from 'react';
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MessageIcon from '@material-ui/icons/Message';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SettingsIcon from '@material-ui/icons/Settings';

const NavBar = ({navItems}) => {

    const renderIcons = (param) => {
        switch (param) {
            case 'Messages': return <MessageIcon/>;
            case 'Users': return <PeopleAltIcon/>;
            case 'News': return <NewReleasesIcon/>;
            case 'Music': return <MusicNoteIcon/>;
            case 'Settings': return <SettingsIcon/>;
            default: return <MessageIcon/>;
        }
    };

    return (
        <StyledMenuList className={classes.nav}>
            {navItems.map(item => {
                return (
                 <MenuItem  component={NavLink} to={`/${item}`}>
                     <ListItemIcon>
                         {renderIcons(item)}
                     </ListItemIcon>
                     <ListItemText className={classes.item} primary={item}/>
                 </MenuItem>
                )
            })}

        </StyledMenuList>
    );
};


    const StyledMenuList = withStyles((theme) => ({
        root: {
            '& .MuiListItem-root': {
                transition: '0.2s ease-in'
            },
                '& .MuiListItem-root.active': {
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 15,
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: theme.palette.common.white,
                    },
                },
            '& .MuiListItemText-primary': {
                fontSize: 20,
            }

        },
    }))(MenuList);


export default NavBar;