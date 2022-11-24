import React, { useState } from "react";

type AuthContextObj = {
    isLoggedIn : boolean;
    login : (token: string) => void;
    logout : () => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    isLoggedIn : false,
    login : () => {},
    logout : () => {},
})

export const AuthContextProvider : React.FC = (props : any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    
    const loginHandler = () => {
    setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn : isLoggedIn,
            login : loginHandler,
            logout : logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;