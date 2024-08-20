import { useState, useEffect } from "react";

import WordGame from "../components/WordGame";
import WORD_LIST from "../constants/word_list.json";
import "../assets/styles/wordgame.css";

const WordGamePage = () => {
    const [secretWord, setSecretWord] = useState("");

    console.log(secretWord)

    useEffect(() => {
        setSecretWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase());
    }, []);

    const handleNewSecretWord = () => {
        setSecretWord((WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]).toUpperCase());        
    }

    return (
        <div className="main-background">
            <h1 className="word-game p-3">WORD GAME</h1>
            <h3 className="word-game px-3">Type letters and then press enter to submit a guess.</h3>
            {secretWord && <WordGame secretWord={secretWord} handleNewSecretWord={handleNewSecretWord} />}
        </div>
    );
};

export default WordGamePage;