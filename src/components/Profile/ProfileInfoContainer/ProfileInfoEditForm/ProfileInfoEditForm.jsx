import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from './ProfileInfoEditForm.module.css'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Field, FormSection, reduxForm} from "redux-form";

const ProfileInfoEditForm = ({setEditable, handleSubmit, initialValues}) => {

    const [isVisibleDescriptionField, setVisibleDescriptionField] = React.useState(initialValues.lookingForAJob);


    const setVisible = () => {
        setVisibleDescriptionField(prevState => !prevState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Paper className={styles.container}>
                <div className={styles.title}>
                    <Typography variant={'h5'}>About me</Typography>
                </div>
                <div className={styles.fullName}><Field label={'Full Name'} name={'fullName'} component={renderTextField}/></div>
                <Field label={'About me'} name={'aboutMe'} rows={4} multiline fullWidth type={'text'} component={renderTextField}/>
            </Paper>
            <Paper className={styles.container}>
                <div className={styles.title}>
                    <Typography variant={'h5'}>Contacts</Typography>
                </div>
                <FormSection name={'contacts'}>
                    <Grid container>
                        <div className={styles.inputContainer}><Field label={'Facebook'} name={'facebook'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Web-site'} name={'website'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Vkontakte'} name={'vk'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Twitter'} name={'twitter'} type={'text'} component={renderTextField}/></div>
                    </Grid>
                    <Grid container className={styles.grid}>
                        <div className={styles.inputContainer}><Field label={'Instagram'} name={'instagram'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Youtube'} name={'youtube'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Github'} name={'github'} type={'text'} component={renderTextField}/></div>
                        <div className={styles.inputContainer}><Field label={'Main Link'} name={'mainLink'} type={'text'} component={renderTextField}/></div>
                    </Grid>
                </FormSection>
            </Paper>
            <Paper className={styles.container}>
                <Field
                    component={renderCheckBox}
                    type={'checkbox'}
                    name={'lookingForAJob'}
                    label='Looking for a job'
                    setVisible={setVisible}
                />
                {isVisibleDescriptionField && <>
                    <div className={styles.title}>
                        <Typography variant={'h5'}>Professional skills</Typography>
                    </div>
                    <Field label={'Professional skills'} name={'lookingForAJobDescription'} rows={4} multiline fullWidth type={'text'} component={renderTextField}/>
                </>}
            </Paper>
            <div className={styles.buttonsContainer}>
                <Button color='primary' type={'submit'} variant='contained'>Accept</Button>
                <Button onClick={() => setEditable(false)} variant='contained'>Cancel</Button>
            </div>
        </form>
    );
};

const renderTextField = ({input, label, rows, multiline, fullWidth}) => (
    <TextField
        label={label}
        variant={'outlined'}
        rows={rows}
        multiline={multiline}
        fullWidth={fullWidth}
        {...input}
    />
);


const renderCheckBox = ({input, label, setVisible}) => {
    const onChange = (e) => {
        input.onChange(e);
        setVisible();
    };

    return <FormControlLabel
        control={<Checkbox name="lookingForAJob" {...input} onChange={onChange}/>}
        label={label}
    />
};





export default reduxForm({form: 'profileInfoEditForm'})(ProfileInfoEditForm);