import List from "@mui/material/List";
import User from '../User/User';
import './Users.css';

export default function Users(props:any) {
    const { users, user, activeUser, onUserSelect } = props;

    return (
        <List className="chat-user" dense>
            {users?.map((chatUser:any) => {
                const { userId } = chatUser;
                const isActive = activeUser ? userId == activeUser.uid : false;

                if (user.uid !== userId)
                    return (<User key={userId} chatUser={chatUser} user={user} activeUser={activeUser} onUserSelect={onUserSelect} ></User>)
            })}
        </List>
    );
}