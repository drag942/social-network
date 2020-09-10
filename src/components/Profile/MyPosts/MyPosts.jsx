import React from "react";
import classes from "./MyPosts.module.css"
import Post from "./Post/Post";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm, reset} from "redux-form";
import Button from "@material-ui/core/Button";
import {maxLengthValidateCreator, required} from "../../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../../../redux/profileReducer";
import {getPosts} from "../../../redux/profileSelectors";


const MyPosts = () => {

    const dispatch = useDispatch();
    const posts = useSelector(state => getPosts(state));

    const addPostHandler = ({postBody}) => {
        dispatch(addPost(postBody));
        dispatch(reset('addPostForm'));
    };

    return (
        <div className={classes.postBlock}>
            <h3>My Posts</h3>
            <div className={classes.posts}>
                {posts.map(({id, message}) =>
                    <Post massage={message} key={id}/>
                )}
            </div>
            <AddPostReduxForm onSubmit={addPostHandler}/>

        </div>
    );
};

const renderTextField = ({label, input, meta: {touched, invalid, error}}) => (
    <TextField
        label={label}
        placeholder={label}
        multiline
        variant={"outlined"}
        rows={4}
        fullWidth
        error={touched && invalid}
        helperText={touched && error}
        {...input}
    />
);

const maxlength50 = maxLengthValidateCreator(50);

const AddPostForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
       <Field name={'postBody'} component={renderTextField} label={"Add Post"} validate={[required, maxlength50]}/>
        <div className={classes.submitButton}><Button variant={"contained"} color={"primary"} type={"submit"}>Add Post</Button></div>
    </form>
);

const AddPostReduxForm = reduxForm({form: 'addPostForm'})(AddPostForm);

export default MyPosts;