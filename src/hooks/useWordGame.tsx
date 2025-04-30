import { useState } from "react";
import WORD_LIST from "../assets/data/word_list_large.json";

interface LetterInfo {
    key: string,
    color: string,
}

const useWordGame = (secretWord: string | null[]) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState([""]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState<Record<string, string>>({});
    const [notificationText, setNotificationText] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const handleKeyup = ({ key }: KeyboardEvent) => {
        handleLetterInput(key);
    }

    // format a guess into an array of letter objects 
    // e.g. [{key: "a", color: "yellow"}]
    const formatGuess = () => {
        let secretWordArray = [...secretWord];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: "grey" };
        });

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (secretWord[i] === l.key) {
                formattedGuess[i].color = "green";
                secretWordArray[i] = null;
            }
        });

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (secretWordArray.includes(l.key) && l.color !== "green") {
                formattedGuess[i].color = "yellow";
                secretWordArray[secretWordArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess: Array<LetterInfo>) => {
        if (currentGuess === secretWord) {
            setIsCorrect(true);
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess];
        })
        setTurn(prevTurn => {
            return prevTurn + 1;
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.map(l => {
                const currentColor = prevUsedKeys[l.key];

                if (l.color === "green") {
                    prevUsedKeys[l.key] = "green";
                    return;
                }
                if (l.color === "yellow" && currentColor !== "green") {
                    prevUsedKeys[l.key] = "yellow";
                    return;
                }
                if (l.color === "grey") {
                    prevUsedKeys[l.key] = "grey";
                    return;
                }
            });
            return prevUsedKeys;
        });
        setCurrentGuess("");
    }

    const handleLetterInput = (letter: string) => {
        let matchFound: Boolean = false;
        if (letter === "Enter") {

            // Check if guess is in dictionary
            for (let i = 0; i < WORD_LIST.length; i++) {
                if (WORD_LIST[i].toUpperCase() === currentGuess) {
                    matchFound = true;
                }
            }

            // Alert user they cannot make a guess less than 5 letters
            if (currentGuess.length !== 5) {
                setNotificationText("Word must be 5 letters long.");
                setShowNotification(true);
                return;
            }

            // Alert user their guess is not in the dictionary
            if (matchFound !== true){
                setNotificationText("Word not in dictionary.");
                setShowNotification(true);
                return;
            }

            // Alert user they cannot make a guess they already submitted
            if (history.includes(currentGuess)) {
                setNotificationText("You already tried that word.");
                setShowNotification(true);
                return;
            }  

            // Don't allow more letters than 5
            if (turn > 5) {
                return;
            }       

            const formatted: Array<LetterInfo> = formatGuess();
            addNewGuess(formatted);
        }
        if (letter === "Backspace") {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }
        if (/^[A-Za-z]$/.test(letter)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + letter.toUpperCase());
            }
        }
        setShowNotification(false);
    }

    // Reset the game board if the user wants to play another game.
    const handleNewGame = () => {
        setTurn(0);
        setCurrentGuess("");
        setGuesses([...Array(6)]); // each guess is an array
        setHistory([]); // each guess is a string
        setIsCorrect(false);
        setUsedKeys({});
        setNotificationText("");
    }

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        handleKeyup,
        handleLetterInput,
        handleNewGame,
        notificationText,
        showNotification
    }
}

export default useWordGame;