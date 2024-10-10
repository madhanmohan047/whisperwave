import { useEffect, useState } from "react";
import { useBreakPoint } from "../../hooks/BreakPointProvider";
import UserWindow from "../../components/UserWindow/UserWindow";
import ChatWindow from '../../components/Chat/ChatWindow/ChatWindow';
import { useFireBase } from "../../hooks/FireBaseProvider";
import { useAuth } from "../../hooks/AuthProvider";
import './Dashboard.css';

export default function Dashboard() {
    const { user } = useAuth();
    const { getChatUsersByUser } = useFireBase();
    const [showUserChat, setShowUserChat] = useState(false);
    const { breakPoint } = useBreakPoint();
    const [showNavBar, setShowNavBar] = useState(true);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState();

    const onUserSelect = (selectedUser: any) => {
        setActiveUser(selectedUser);
        setShowUserChat(true);
    };

    const onBackToUser = () => {
        setShowUserChat(false);
    }

    useEffect(() => {
        if (user) {
            getChatUsersByUser(user).then((chatUsers: any) => {
                setUsers(chatUsers)
            })
        }
    }, [user])

    return (
        <div className="dashboard">
            {!showUserChat && <UserWindow users={users} user={user} activeUser={activeUser} onUserSelect={onUserSelect}></UserWindow>}
            {showUserChat && <ChatWindow users={users} user={user} activeUser={activeUser} onBackToUser={onBackToUser}></ChatWindow>}
        </div>
    )
}