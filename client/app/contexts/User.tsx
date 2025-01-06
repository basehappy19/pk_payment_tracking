'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { getUserData } from '../functions/getUserData';
import { Session } from '../types/session';

interface RootProps {
    children: ReactNode;
}
  
const UserContext = createContext<Session | null>(null);

export const UserProvider = ({children}: RootProps) => {
    const {data: session} = useSession();    
    const [user, setUser] = useState<Session | null>(null);
    
    const fetchUserData = async () => {
        try {
            const res = await getUserData();
            setUser(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(session) {
            fetchUserData();
        }
    }, [session]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
