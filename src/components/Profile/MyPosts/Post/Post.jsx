import React from "react";
import classes from "./Post.module.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const Post = ({massage}) => {
    return (
        <Card className={`${classes.item}`}>
            <CardContent><span>{massage}</span></CardContent>
        </Card>
    );
};

export default Post;