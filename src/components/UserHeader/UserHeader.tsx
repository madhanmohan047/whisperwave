import * as React from 'react';
import Header from '../Header/Header';
import NewChatDialog from '../NewChatDialog/NewChatDialog';
import './UserHeader.css';

export default function UserHeader() {

    return (
        <Header showOptions={true} title="Chats">
            <NewChatDialog></NewChatDialog>
        </Header>

    )
}