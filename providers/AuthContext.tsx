"use client";
import { createContext, useContext, useEffect, useState } from 'react';

// Define the initial state of your context
interface MyContextProps {
    children: React.ReactNode;
}

interface AuthContextProps {
    loggedInUser: any;
    setLoggedInUser: (user: any) => void;
    bankAccounts: any;
    setBankAccounts: (accounts: any) => void;
}

// Create a new context
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthContextProvider = ({ children }: MyContextProps) => {
    // Define your state and any necessary functions
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [bankAccounts, setBankAccounts] = useState(null);


    // Add any functions to update the state
    const contextValue = {
        loggedInUser,
        setLoggedInUser,
        bankAccounts,
        setBankAccounts,
    }
    // Return the provider component with the state and functions
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const Context = useContext(AuthContext);

    if (!Context) {
        throw Error('Component needs to be a descendant of AuthContextProvider');
    }

    return Context;
};