import { useEffect, useRef } from 'react';
import './Message.css';

export default function Message(props:any) {
    const { id, messages, user } = props;
    const { message, timestamp, messageUserId} = messages
    const messageDate = new Date(timestamp*1000)
    const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const scroll = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(scroll && scroll.current){
            scroll.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [scroll])

    return (
        <div
            ref={scroll}
            key={id}
            style={{
                margin: 2,
                display: "flex",
                flexDirection:
                    user?.uid == messageUserId
                        ? "row-reverse"
                        : "row",
            }}
        >
            <span className={user?.uid == messageUserId ? 'message-sender' : 'message-recipient'}>
                <span className='message-details'>
                    <span className='message-text'>
                        {message}
                    </span>
                    <span className='message-timestamp'>
                        {messageTime}
                    </span>
                </span>
            </span>

        </div>
    );
}