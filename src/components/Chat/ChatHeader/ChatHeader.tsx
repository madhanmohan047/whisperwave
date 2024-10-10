import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import './ChatHeader.css';


export default function ChatHeader(props: any) {
    const { activeUser, onBackToUser } = props;
    const { userName: userName, photoURL } = activeUser || {};

    return (
        <div className="header">
            {
                userName &&
                <div className='chat-header-user'>
                    {
                        !!onBackToUser &&
                        <IconButton
                            className="back-btn"
                            onClick={onBackToUser}
                            size="small"
                            sx={{ ml: 2, color: "#FFF" }}
                        >
                            <ArrowBack style={{ color: 'd3e1e3' }} />
                        </IconButton>}
                    <Avatar alt={`${userName}`} src={photoURL} />
                    <h4>{userName}</h4>
                    <Divider />
                </div>}
        </div>
    )
}