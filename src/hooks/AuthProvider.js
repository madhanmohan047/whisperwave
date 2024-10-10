import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFireBase } from "./FireBaseProvider";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { auth } = useFireBase();
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const navigate = useNavigate();


  if (auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
        setIsAuthenticated(false);
      } else {
        const currentPath = window.location.pathname
        if (["/signin", "/signup"].indexOf(currentPath) === -1) {
          navigate("/signin");
        }
      }
    })
  }

  const login = async (data) => {
    try {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { accessToken, uid: userId } = user;
          setUser(user);
          setUid(user.uid);
          localStorage.setItem("uid", user.uid);
          setToken(accessToken);
          localStorage.setItem("token", user.accessToken);
          setIsAuthenticated(true);
          navigate(`/dashboard/`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + ": " + errorMessage);
        });
    } catch (err) {
      navigate("/signin");
    }
  };

  const logOut = () => {
    if (auth) {
      auth.signOut()
    }
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, uid, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};