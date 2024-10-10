import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query, where, getDocs, or, addDoc } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";

const FirebaseContext = createContext();

const FireBaseProvider = ({ children }) => {
    const [app, setApp] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const firebaseConfig = {
        apiKey: "AIzaSyBy4Lvzz3Hai6wQTJ_ZyMZuRr8-gk4_kHg",
        authDomain: "accelerators-c748d.firebaseapp.com",
        projectId: "accelerators-c748d",
        storageBucket: "accelerators-c748d.appspot.com",
        messagingSenderId: "481403597952",
        appId: "1:481403597952:web:febdfed188fb0d4dada265",
        measurementId: "G-HVHVZGMS1H"
    };

    const initializeFirebaseApp = () => {
        const _app = initializeApp(firebaseConfig);
        const _db = getFirestore(_app);
        const _auth = getAuth(_app);
        setPersistence(_auth, browserLocalPersistence);
        setApp(_app)
        setDb(_db)
        setAuth(_auth)
    }

    if (!app) {
        initializeFirebaseApp();
    }

    if (auth) {
        const currentPath = window.location.pathname
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                if (["/signin", "/signup"].indexOf(currentPath) !== -1) {
                    navigate("/");
                }
            }
        })
    }


    const getAllMessagesForUser = (receiver, sender) => {
        const requestPromise = new Promise((onSuccess) => {
            onSnapshot(
                query(
                    collection(
                        db,
                        "users",
                        receiver?.uid,
                        "chatUsers",
                        sender?.userId,
                        "messages"
                    ),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    const messages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        messages: doc.data(),
                    }))
                    onSuccess(messages)
                }
            );
        })

        return requestPromise
    }

    const getLatestMessagesForUser = async (receiver, sender) => {
        const messagesList = await getAllMessagesForUser(receiver, sender)
        if (messagesList.length > 0) {
            return messagesList[0].messages
        }

        return null
    }

    const getUsersByEmail = async (email) => {
        let users = []
        const q = query(collection(db, "users"), or(where("email", ">=", email), where("email", "<=", email)))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            users = users.concat(doc.data())
        });
        return users;
    }

    const addUserToChat = async (user, friend) => {
        await addDoc(
            collection(
                db,
                "users",
                user.uid,
                "chatUsers"
            ),
            friend
        );
    }

    const getChatUsersByUser = (user) => {
        const requestPromise = new Promise((onSuccess) => {
            onSnapshot(collection(db, "users", user.uid, "chatUsers"), (snapshot) => {
                onSuccess(snapshot.docs.map((doc) => doc.data()))
            });
        })
        return requestPromise;
    }

    const sendMessage = async (user, activeUser, message) => {
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
                        message: message,
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
                        message: message,
                        timestamp: new Date(),
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }

        return true
    }

    return (
        <FirebaseContext.Provider value={{ 
                app, 
                db, 
                auth, 
                getLatestMessagesForUser, 
                getAllMessagesForUser, 
                getUsersByEmail, 
                getChatUsersByUser,
                addUserToChat,               
                sendMessage 
            }}>
            {children}
        </FirebaseContext.Provider>
    );

};

export default FireBaseProvider;

export const useFireBase = () => {
    return useContext(FirebaseContext);
};