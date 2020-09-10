import styles from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const Dialog = ({name}) => {
    return (
        <div className={styles.dialog}>
            <NavLink to={`/Messages/${name}`}>{name}</NavLink>
        </div>
    );
};

export default Dialog;