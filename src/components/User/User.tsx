import { useState, useEffect } from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useFireBase } from "../../hooks/FireBaseProvider";
import './User.css';

export default function User(props:any) {
    const { user, chatUser, activeUser, onUserSelect } = props;
    const [latestMessage, setLatestMessage] = useState('');
    const [latestMessagTime, setLatestMessagTime] = useState('');
    const { getLatestMessagesForUser } = useFireBase();
    const { userId, userName, photoURL } = chatUser;
    const labelId = `checkbox-list-secondary-label-${userId}`;
    const isActive = activeUser && activeUser.userId === userId;
    const activeClassName = isActive ? 'active-user user-item' : 'user-item';


    // if(currentUser && user){
    //     getLatestMessagesForUser(currentUser, user).then((message:any) => {
    //         if(message) {
    //             setLatestMessage(message.message)
    //             const messageDate = new Date(message.timestamp*1000)
    //             const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //             setLatestMessagTime(messageTime)
    //         }
    //     })
    // }

    useEffect(()=>{
        if(user && chatUser){
            console.log(user)
            console.log(chatUser)
            getLatestMessagesForUser(user, chatUser).then((message:any) => {
                if(message) {
                    setLatestMessage(message.message)
                    const messageDate = new Date(message.timestamp*1000)
                    const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    setLatestMessagTime(messageTime)
                }
            })
        }
    }, [])

    return (
        <ListItem key={userId} disablePadding className={activeClassName}>
            <ListItemButton  onClick={() => { onUserSelect(chatUser); }} >
                <ListItemAvatar>
                    <Avatar
                        alt={`${userName}`}
                        src={photoURL}
                    />
                </ListItemAvatar>
                <div className='user-details-wrapper'>
                    <div className='user-name-timestamp'>
                        <ListItemText sx={{color: "#FFF"}} id={labelId} primary={`${userName}`}/>
                        <span className='msg-timestamp'>{latestMessagTime}</span>
                    </div>
                    {latestMessage && <div className='latest-msg-preview'> {latestMessage} </div>}
                    
                </div>

            </ListItemButton>
        </ListItem>
    );
}