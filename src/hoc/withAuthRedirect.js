import React from 'react';
import {Redirect} from "react-router";
import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/authSelectors";


export const withAuthRedirect = (Component) => {
   return (props) => {
            const isAuth = useSelector(state => getIsAuth(state));
            if (!isAuth) return <Redirect to='/login'/>;
            return <Component {...props}/>
   }
};