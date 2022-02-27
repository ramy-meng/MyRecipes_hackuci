import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    // const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(null)

    const userIsLoggedIn = !!token;

    const logoutHandler = () =>{
        setToken(null);
        // localStorage.removeItem('token');
    };

    const loginHandler = (token, password) => {
        setToken(token);
        // localStorage.setItem('token', token);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (

    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
    );
};

export default AuthContext;