import styles from "../Dialogs.module.css";
import React from "react";

const Massage = ({text}) => {
    return (
        <div className={styles.message}>{text}</div>
    );
};

export default Massage;