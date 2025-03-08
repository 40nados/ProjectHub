import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
    token: string;
    username: string;
    email: string;
    user_photo: string;
    userId: string;
    color: string;
    language: string;
    chats: string[];
};

interface IUserInfos {
    userInfos: any | null;
    setUserInfos: Function;
}

const authContext = createContext<IUserInfos>({} as IUserInfos);
export default authContext;

export const AuthProvider = ({ children }: any) => {
    const [userInfos, setUserInfos] = useState<AuthContextType | null>(null);

    useEffect(() => {
        const userLocalStorage = localStorage.getItem('user');
        if (userLocalStorage) {
            const user = JSON.parse(userLocalStorage);
            setUserInfos(user);
            // document.documentElement.style.setProperty("--vice-color", user?.color);
        }
    }, []);

    // useEffect(() => {
    //     document.documentElement.style.setProperty("--vice-color", userInfos?.color || '');
    // }, [userInfos])

    return (
        <authContext.Provider value={{ userInfos, setUserInfos }}>{children}</authContext.Provider>
    );
};
