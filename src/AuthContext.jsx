import React, { createContext, useContext, useState } from "react";
import { isAuthenticated, saveToken, logout as apiLogout } from "./api";

//skapar context-objektet
//null är standardvärdet innan Provider är på plats
const AuthContext = createContext(null);

//Provider-komponenten som omsluter hela appen.
// håller auth-state och exponerar login/logout till alla barn
export function AuthProvider({ children }) {
    const [authed, setAuthed] = useState(isAuthenticated());

    //anropas vid login
    function login(token) {
        saveToken(token);
        setAuthed(true);
    }

    //anropas vid logout
    function logout() {
        apiLogout();
        setAuthed(false);
    }

    return (
        <AuthContext.Provider value={{ authed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

//custom hook
export function useAuth() {
    return useContext(AuthContext);
}