import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Stores user info and the "Signing Private Key" received after login
    const [voter, setVoter] = useState(null);
    // Stores the "System Public Key" used for encryption
    const [systemPublicKey, setSystemPublicKey] = useState(null);

    return (
        <AuthContext.Provider value={{ voter, setVoter, systemPublicKey, setSystemPublicKey }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);