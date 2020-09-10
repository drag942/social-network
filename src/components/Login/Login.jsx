import React from 'react';
import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from '@material-ui/icons/Lock';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import classes from './Login.module.css'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {loginUserAsyncAction} from "../../redux/authReducer";

const Login = () => {

    const dispatch = useDispatch();
    const {isAuth, userId, isAuthorizing} = useSelector(({auth}) => ({
        isAuth: auth.isAuth,
        userId: auth.id,
        isAuthorizing: auth.isAuthorizing,
    }));

    const onSubmit = ({email, password, rememberMe}) => {
        dispatch(loginUserAsyncAction(email, password, rememberMe));
    };

    if(isAuth) return <Redirect to={`/profile/${userId}`}/>;

    return (
        <div className={classes.loginContainer}>
                <Card className={classes.loginTitle}><Typography variant={'h4'}>Login</Typography></Card>
            <Card>
                <LoginReduxForm onSubmit={onSubmit} isAuthorizing={isAuthorizing}/>
            </Card>
        </div>
    );
};

const LoginForm = ({handleSubmit, error, isAuthorizing}) => {
    return (
        <form className={classes.loginForm} onSubmit={handleSubmit}>
            <div className={classes.formInput}>
                <Field name={"email"} component={renderInputField} label={"email"} type={"text"}/>
            </div>
            <div className={classes.formInput}>
                <Field name={"password"} component={renderInputField} label={"password"} type={"text"}/>
            </div>
            <div>
                <label>
                    <Field  component={renderCheckBox} name={"rememberMe"}  type={"checkbox"}/>
                    Remember me
                </label>
            </div>
            <div className={classes.buttonSubmit}>
                <Button disabled={isAuthorizing} size='large' color={"primary"} type={"submit"}>Get Started</Button>
            </div>
            <div>
                <span className={classes.errorMassage}>{error}</span>
            </div>
        </form>
    );
};


const renderInputField = ({label, input}) => (
    <TextField
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {label === 'email' ? <AlternateEmailIcon/> : <LockIcon/>}
                </InputAdornment>
            )
        }}
        label={label}
        type={label === 'password' ? 'password' : 'text'}
        {...input}
    />
);

const renderCheckBox = ({input}) => (
    <Checkbox
        inputProps={{ 'aria-label': 'primary checkbox' }}
        {...input}
    />
);



const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);


export default Login;