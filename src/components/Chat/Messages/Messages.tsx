import Message from '../Message/Message';
import './Messages.css';

export default function Messages(props:any) {
    const { user, messages, scroll } = props;

    return (
        <div className='messages-wrapper'>
            {messages &&
                messages.map((message:any) => {
                    return (
                        <Message key={message.id} {...message} user={user}></Message>
                    );
                })}
                <span className='scroll-ref' ref={scroll}></span>
        </div>
    )
}