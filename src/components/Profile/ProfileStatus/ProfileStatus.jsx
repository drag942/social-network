import React from 'react';
import {TextField} from "@material-ui/core";
import PreLoader from "../../../assets/PreLoader";
import IconButton from "@material-ui/core/IconButton";
import BorderColorIcon from '@material-ui/icons/BorderColor';

const ProfileStatus = (props) => {


    const status = props.status ? props.status : "Нет статуса";

    const [editMode, setEditMode] = React.useState(false);
    const [editableStatus, setEditableStatus] = React.useState(status);

    React.useEffect(() => {setEditableStatus(status)}, [status]);

    const onUpdateUserStatusHandler = () => {
        if(editableStatus !== status) props.updateUserStatus(editableStatus);
        setEditMode(false);
    };


    return (
        <div>
            {editMode ?
                <div>
                    <TextField
                                value={editableStatus}
                                onChange={(e) => setEditableStatus(e.target.value)}
                                autoFocus
                                onBlur={onUpdateUserStatusHandler}
                    />
                </div> :
                <>
                    <span>{editableStatus}</span>
                    {props.isEditable && <IconButton onClick={() => { setEditMode(true)}}><BorderColorIcon fontSize={"small"}/></IconButton>}
                </>
            }
            {props.isUpdatingStatus && <PreLoader/> }

        </div>
    );
};

export default ProfileStatus;