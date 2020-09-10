import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import FacebookIcon from '@material-ui/icons/Facebook';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import {deepOrange} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getAuthId, getAuthLogin, getAuthProfile, getIsAuth} from "../../redux/authSelectors";
import {logoutUserAsyncAction} from "../../redux/authReducer";
const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const {isAuth, authId, login, authProfile} = useSelector(state => ({
        isAuth: getIsAuth(state),
        authId: getAuthId(state),
        login: getAuthLogin(state),
        authProfile: getAuthProfile(state),
    }));

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(logoutUserAsyncAction());
        handleClose();
    };

    return (
        <AppBar>
            <Container>
            <Toolbar className={classes.header}>
                <div className={classes.logo}>
                    <IconButton edge={'start'} className={classes.logo}>
                        <NavLink to={'/'}><FacebookIcon style={{fontSize: 50, color: "white"}}/></NavLink>
                    </IconButton>
                </div>

                {isAuth ?
                    <div>
                        <IconButton
                            color="inherit"
                            onClick={handleOpen}
                        >
                            <Avatar src={authProfile ? authProfile.photos.small : ''} alt={login}  style={{backgroundColor: deepOrange[500]}}/>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><NavLink className={classes.userLink} to={`/profile/${authId}`}>{login}</NavLink></MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>}
            </Toolbar>
            </Container>
        </AppBar>
    );
};


export default Header;