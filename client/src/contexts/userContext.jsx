import React, { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userGamesHistory, setUserGamesHistory] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const contextLogin = (userInfo, gamesHistory) => {
        setUser(userInfo);
        setUserGamesHistory(gamesHistory);
        // save also to localStorage
        try {
            localStorage.setItem('userContext', JSON.stringify(userInfo));
            localStorage.setItem('userGamesHistory', JSON.stringify(gamesHistory));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    const contextLogout = () => {
        setUser(null);
        setUserGamesHistory([]);
        // remove from localStorage
        try {
            localStorage.removeItem('userContext');
            localStorage.removeItem('userGamesHistory');
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    };

    // Load user context from localStorage when page changes (e.g. manual refresh)
    useEffect(() => {
        const savedUser = localStorage.getItem('userContext');
        const savedGamesHistory = localStorage.getItem('userGamesHistory');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedGamesHistory) {
            setUserGamesHistory(JSON.parse(savedGamesHistory));
        }
    }, [location, navigate]);

    return (
        <UserContext.Provider value={{ user, contextLogin, contextLogout, userGamesHistory }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };