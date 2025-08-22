import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, set_user] = useState(null);
    const [is_logged_in, set_is_logged_in] = useState(false);

    const login = (user_data) => {
        set_user(user_data);
        set_is_logged_in(true);
    };

    const logout = () => {
        set_user(null);
        set_is_logged_in(false);
    };

    const value = {
        user,
        is_logged_in,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}