import React from 'react';
import Button from "@material-ui/core/Button";
import User from "./User/User";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getIsFetchingUsers,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {getNewUsersAsyncAction, getUsersAsyncAction} from "../../redux/usersReducer";
import styles from "./Users.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingBlock from "../../utils/LoadingBlock";
import Paginator from "../Paginator/Paginator";

const Users =  () => {

        const {users, currentPage, pageSize, isFetchingUsers, totalUsersCount} = useSelector(state => ({
            users: getUsers(state),
            currentPage: getCurrentPage(state),
            pageSize: getPageSize(state),
            isFetchingUsers: getIsFetchingUsers(state),
            totalUsersCount: getTotalUsersCount(state),
        }));

        const pagesCount = Math.ceil(totalUsersCount / pageSize);

        const dispatch  = useDispatch();


        React.useEffect(() => {
            if(users.length < 1) dispatch(getUsersAsyncAction(currentPage, pageSize));
        },[currentPage, dispatch, pageSize, users.length] );


        const onPageChange = () => {
            let localCurrentPage = currentPage;
            dispatch(getNewUsersAsyncAction(++localCurrentPage, pageSize));
        };

        if(users.length < 1) {
            return Array(pageSize).fill(0).map((_, index) => <LoadingBlock key={index}/>)
        }


        return (
            <div className={styles.usersContainer}>
                <Paginator pagesCount={pagesCount} portionSize={10}/>
                {users.map((user) => {
                        return <User
                            id={user.id}
                            name={user.name}
                            photos={user.photos}
                            followed={user.followed}
                            key={user.id}
                        />
                    }
                )}
                <div className={styles.moreUsersButton}>
                    <Button
                        startIcon={isFetchingUsers && <CircularProgress color='inherit' size={20}/>}
                        disabled={isFetchingUsers}
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={onPageChange}>
                        MORE USERS
                    </Button>
                </div>
            </div>
        );
};


export default Users;