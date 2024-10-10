import React from "react";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import UserHeader from "../UserHeader/UserHeader";
import Users from "../Users/Users";
import './UserWindow.css';


export default function UserWindow(props:any) {
    const { users, user, activeUser, onUserSelect } = props
    return (
        <Paper className='user-window-left'>
            <UserHeader></UserHeader>
            <Divider />
            <Users users={users} onUserSelect={onUserSelect} user={user} activeUser={activeUser} />
        </Paper >
    )
}