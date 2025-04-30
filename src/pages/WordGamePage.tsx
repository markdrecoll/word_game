import { useState, useEffect } from "react";
// import NavigationMenu from "../components/NavigationMenu.tsx";
import Game from "../components/Game.tsx";
import WORD_LIST_SMALL from "../assets/data/word_list_small.json";
import "../assets/styles/wordgame.css";
// import { useAuth } from "../provider/authProvider";


const WordGame = () => {

    // Not available in this repo.
    // const { userDetails } = useAuth();
    const userDetails = {
        username: "John",
        bestScore: 7
    }
    let userName = "";
    // if (userDetails !== 0) {
    //     userName = userDetails.username;
    // }
    if (userDetails) {
        userName = userDetails.username;
    }

    const [secretWord, setSecretWord] = useState("");
    const [bestScore, setBestScore] = useState(7);
    const [scoreMessage, setScoreMessage] = useState("Loading score...");
    let newSecretWord;

    useEffect(() => {
        handleNewSecretWord();
    }, []);

    useEffect(() => {
        // if (userDetails.length !== 0) {
        //     fetchOrUpdateScore(7);
        // }
        if (userDetails) {
            fetchOrUpdateScore(7);
        }
        handleUpdateScoreMessage();
    }, [bestScore, scoreMessage]);

    const handleUpdateScoreMessage = () => {
        setScoreMessage(`Your best score is ${bestScore} turn${bestScore > 1 ? "s" : ""}.`);
    }

    const handleNewSecretWord = () => {
        newSecretWord = WORD_LIST_SMALL[Math.floor(Math.random() * WORD_LIST_SMALL.length)].toUpperCase();
        console.log("The secret word is", newSecretWord);
        setSecretWord(newSecretWord);
    }

    const startNewGame = () => {
        handleNewSecretWord();
    };

    const fetchOrUpdateScore = async (roundScore: number) => {
        const response = await fetch("/api/scoring/wordgame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, roundScore })
        });
        const data = await response.json();
        if (data.status === "Success") {
            setBestScore(data.bestScore);
        } else {
            console.error("Failed to fetch high score data.");
        }
    }

    return (
        <div className="default-site-main-div">
            {/* <NavigationMenu currentSite="defaultSite" /> */}
            <h1 className="word-game p-2 pb-0 mb-0 text-center">WORD GUESSING GAME</h1>
            <p className="word-game mb-2">
                Try to guess the five letter word.
            </p>
            {secretWord &&
                <Game
                    secretWord={secretWord}
                    startNewGame={startNewGame}
                    bestScore={bestScore}
                    fetchOrUpdateScore={fetchOrUpdateScore}
                />
            }
            {/* {userDetails.length !== 0 ? ( */}
            {userDetails ? (
                bestScore > 6 ? (
                    <p className="word-game">
                        High Score: You have not won a game yet.
                    </p>
                ) : (
                    <p className="word-game">
                        {scoreMessage}
                    </p>
                )
            ) : (
                <p className="word-game">
                    Login to keep track of your scores.
                </p>
            )}
        </div>
    );
};

export default WordGame;