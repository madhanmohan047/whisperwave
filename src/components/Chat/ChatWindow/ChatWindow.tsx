import React, { useRef, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ChatHeader from '../ChatHeader/ChatHeader';
import Messages from '../Messages/Messages';
import SendMessage from '../SendMessage/SendMessage';
import { useFireBase } from "../../../hooks/FireBaseProvider";
import './ChatWindow.css';

export default function ChatWindow(props:any) {
    const { user, activeUser, onBackToUser } = props;
    const { getAllMessagesForUser } = useFireBase();
    const scroll = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(user && activeUser){
            getAllMessagesForUser(user, activeUser).then((userMessages: any) => {
                setMessages(userMessages)
            })
        }
    }, [])

    return (
        <Paper className='chat-window-right'>
            <ChatHeader activeUser={activeUser} onBackToUser={onBackToUser}></ChatHeader>            
            <Messages user={user} messages={messages} scroll={scroll}></Messages>
            <SendMessage scroll={scroll} user={user} activeUser={activeUser}></SendMessage>
        </Paper>
    )
}