import React, { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [game, setGame] = useState(null);
    const [roundsPlayed, setRoundsPlayed] = useState([]);

    return (
        <GameContext.Provider value={{ game, setGame, roundsPlayed, setRoundsPlayed }}>
            {children}
        </GameContext.Provider>
    );
};

export { GameContext, GameProvider };