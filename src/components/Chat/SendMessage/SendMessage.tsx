import { useState } from 'react';
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { EmojiEmotions } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import { useFireBase } from "../../../hooks/FireBaseProvider";
import {
    addDoc,
    collection
} from "firebase/firestore";
import './SendMessage.css';

export default function SendMessage(props:any) {
    const { user, activeUser, scroll } = props;
    const { db } = useFireBase();
    const [chatMessage, setChatMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    const handleShowEmoji = () => {
        setShowEmoji(!showEmoji);
    }

    const handleEmojiClick = (emojiData:any) => {
        setChatMessage(message => {
            return message + '' + emojiData.emoji
        });
    }

    const sendMessage = async () => {
        const messageToSend = chatMessage;
        setChatMessage("");
        try {
            if (user && activeUser) {
                await addDoc(
                    collection(
                        db,
                        "users",
                        user.uid,
                        "chatUsers",
                        activeUser.userId,
                        "messages"
                    ),
                    {
                        userName: user.displayName,
                        messageUserId: user.uid,
                        message: messageToSend,
                        timestamp: new Date(),
                    }
                );

                await addDoc(
                    collection(
                        db,
                        "users",
                        activeUser.userId,
                        "chatUsers",
                        user.uid,
                        "messages"
                    ),
                    {
                        userName: user.displayName,
                        messageUserId: user.uid,
                        message: messageToSend,
                        timestamp: new Date(),
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className='send-message-wrapper'>
                <textarea
                    className='send-message-input'
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type message..."
                />
                <IconButton className='send-message-btn' onClick={handleShowEmoji}>
                    <EmojiEmotions style={{ margin: 10 }} />
                </IconButton>
                <IconButton disabled={!chatMessage} className='send-message-btn' onClick={sendMessage}>
                    <SendIcon style={{ margin: 10 }} />
                </IconButton>
            </div>
            { showEmoji && <div>
                <EmojiPicker width="100%" onEmojiClick={handleEmojiClick}></EmojiPicker>
            </div> }
        </div>

    )
}