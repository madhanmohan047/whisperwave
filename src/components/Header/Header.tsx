import * as React from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { PowerSettingsNew } from '@mui/icons-material';
import { useNavigate } from "react-router";
import { useFireBase } from "../../hooks/FireBaseProvider";
import './Header.css';

export default function UserHeader(props: any) {
    const { title, showOptions = false, children } = props
    const { auth } = useFireBase();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleLogoutClick = () => {
        setAnchorEl(null);
        auth.signOut();
        navigate("/");
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header">
            <div className='header-left'>
                {title && <h3>{title}</h3>}

            </div>
            <div className='header-right'>
                {children}
                {showOptions &&
                    <div >
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2, color: "#FFF" }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </IconButton>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="profile-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleLogoutClick}>
                                <ListItemIcon>
                                    <PowerSettingsNew fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                }
            </div>


        </div>

    )
}