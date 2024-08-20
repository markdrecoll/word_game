import { useState } from 'react';
import WORD_LIST from "../constants/word_list.json"

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
    const [usedKeys, setUsedKeys] = useState({});
    const [notificationText, setNotificationText] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let secretWordArray = [...secretWord];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' };
        });

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (secretWord[i] === l.key) {
                formattedGuess[i].color = 'green';
                secretWordArray[i] = null;
            }
        });

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (secretWordArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
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
                const currentColor: Array<LetterInfo> = prevUsedKeys[l.key];

                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }
            })

            return prevUsedKeys;
        })
        setCurrentGuess("");

    }

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }: KeyboardEvent) => {
        let matchFound: Boolean = false;
        if (key === 'Enter') {

            // guess must be a word
            for (let i = 0; i < WORD_LIST.length; i++) {
                if (WORD_LIST[i].toUpperCase() === currentGuess) {
                    matchFound = true;
                }
            }
            if (matchFound !== true){
                setNotificationText("That is not a word.");
                setShowNotification(true);
                return;
            }

            // only add guess if turn is less than 5
            if (turn > 5) {
                return;
            }

            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                setNotificationText("You already tried that word.");
                setShowNotification(true);
                return;
            }

            // check if word is 5 characters
            // if (currentGuess.length !== 5) {
            //     setNotificationText("Word must be 5 letters long.");
            //     setShowNotification(true);
            //     return;
            // }

            const formatted: Array<LetterInfo> = formatGuess();
            addNewGuess(formatted);
        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key.toUpperCase());
            }
        }
    }

    // Reset the game board if the user wants to play another game.
    const handleNewGame = () => {
        setTurn(0);
        setCurrentGuess("");
        setGuesses([...Array(6)]) // each guess is an array
        setHistory([]) // each guess is a string
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
        handleNewGame,
        notificationText,
        showNotification
    }
}

export default useWordGame;