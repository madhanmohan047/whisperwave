namespace model {

    namespace firebase {
        interface IUser{
            accessToken: string           
            displayName: string,
            email: string,
            emailVerified: boolean
            phone: string,
            photoURL: string,
            uid: string,
        }
    }

    

    interface IProps {
        users: any;
        handleToggle: () => void;
        navigate: any; 
        user: any; 
        allMessages: any; 
        receiverData: any;
    } 
}