import React from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from "./Dialog/Dialog";
import Massage from "./Messages/Message";
import TextField from "@material-ui/core/TextField";
import styles from './Dialogs.module.css'
import Button from "@material-ui/core/Button";
import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../redux/dialogsReducer";
import {getDialogsUsers, getMessages} from "../../redux/dialogsSelectors";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const Dialogs = () => {

    const dispatch = useDispatch();
    const {users, messages} = useSelector(state => ({
        users: getDialogsUsers(state),
        messages: getMessages(state),
    }));

    const onSendMessage = ({messageBody}) => {
        dispatch(sendMessage(messageBody));
    };

    return (
        <div>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    {users.map(({name, id})=>
                        <Dialog name={name} key={id}/>
                    )}
                </Grid>
                <Grid item xs={6}>
                    {messages.map(({message, id}) =>
                        <Massage text={message} key={id}/>
                    )}
                    <div className={styles.massageInputContainer}>
                       <AddMassageReduxForm onSubmit={onSendMessage}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const renderTextField = ({label, input}) => (
    <TextField
        label={label}
        placeholder={label}
        multiline
        variant={"outlined"}
        rows={3}
        fullWidth
        {...input}
    />
);

const AddMassageForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div><Field name={'messageBody'} component={renderTextField} label={"Add message"}/></div>
        <div><Button variant={"contained"} color={"primary"} type={"submit"}>Add Massage</Button></div>
    </form>
);

const AddMassageReduxForm = reduxForm({form: 'addMassageForm'})(AddMassageForm);

export default withAuthRedirect(Dialogs);