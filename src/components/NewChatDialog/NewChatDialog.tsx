import * as React from 'react';
import { Add } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import User from '../User/User';
import { TransitionProps } from '@mui/material/transitions';
import { useFireBase } from '../../hooks/FireBaseProvider';
import { useAuth } from '../../hooks/AuthProvider';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewChatDialog() {
  const { getUsersByEmail, addUserToChat } = useFireBase();
  const { user } = useAuth()
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const handleUserSelect = (selectedUser:any) => {
    addUserToChat(user, selectedUser).then(() => {
      setOpen(false);
    })
  }

  const handleAddChat = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserSearch = (email:string) => {
    if(email && email.length > 3){
      getUsersByEmail(email).then((response:any) => {
        if(response && response.length > 0){
          setUsers(response)
        }
      })
    } else {
      setUsers([])
    }
  }


  return (
    <div>
      <IconButton
        onClick={handleAddChat}
        size="small"
        sx={{ ml: 2, color: "#FFF" }}
      >
        <Add></Add>
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: "#FFF" }} variant="h6" component="div">
              New Chat
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search User"
              inputProps={{ 'aria-label': 'Search User' }}
              onChange={(e) => { handleUserSearch(e.target.value) }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <List className="list-users" dense>
            {users?.map((chatUser:any) => {
                const { userId } = chatUser;

                if (user.uid !== userId)
                    return (<User key={userId} user={chatUser} currentUser={user} handleToggle={handleUserSelect} receiverData={user}></User>)
            })}
        </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}