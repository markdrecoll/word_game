import { useState, useEffect } from "react"
import useWordGame from "../hooks/useWordGame.tsx"
import Keypad from "./Keypad.tsx";
import Modal from "./Modal.tsx";
import keyboard_keys from "../constants/keyboard_keys.ts";
import Grid from "./Grid.tsx";
import Notification from "./Notification.tsx";

interface WordGameProps {
    secretWord: string,
    startNewGame: Function,
    bestScore: number,
    fetchOrUpdateScore: Function,
}

export default function Game({
    secretWord,
    startNewGame,
    bestScore,
    fetchOrUpdateScore,
}: WordGameProps) {
    const {
        currentGuess,
        guesses,
        turn,
        isCorrect,
        usedKeys,
        handleKeyup,
        handleLetterInput,
        handleNewGame,
        notificationText,
        showNotification
    } = useWordGame(secretWord);
    const [showMessageToUser, setShowMessageToUser] = useState(false);
    const [gameResult, setGameResult] = useState<{ isCorrect: boolean, secretWord: string } | null>(null);
    const [gameEnded, setGameEnded] = useState(false);

    const handleCloseModal = () => {
        setGameEnded(false);
        startNewGame();
    }
    const handleShowMessageToUser = () => setShowMessageToUser(true);
    const handleCloseToast = () => setShowMessageToUser(false);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (!gameEnded) {
            if (isCorrect) {
                setGameResult({ isCorrect: true, secretWord: secretWord });
                setGameEnded(true);
                window.removeEventListener('keyup', handleKeyup);
            }
            if (turn >= 6 && !isCorrect) {
                setGameResult({ isCorrect: false, secretWord: secretWord });
                setGameEnded(true);
                window.removeEventListener('keyup', handleKeyup);
            }
        }

        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup, isCorrect, turn])

    useEffect(() => {
        if(showNotification){
            handleShowMessageToUser();
        }
    }, [showNotification])

    return (
        <>
            <Notification
                variant={"dark"}
                header={true}
                headerText={"Cannot make that move."}
                message={notificationText}
                position={"top-center"}
                class={"mt-4 pt-5"}
                delay={2000}
                show={showMessageToUser}
                setShow={handleCloseToast}
            />

            <div className="text-white">
                <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
                <Keypad keys={keyboard_keys} usedKeys={usedKeys} handleLetterInput={handleLetterInput} />
                {gameEnded &&
                    <Modal
                        isCorrect={gameResult?.isCorrect || false}
                        turn={turn}
                        secretWord={gameResult?.secretWord || ""}
                        restartGame={handleNewGame}
                        resetModal={handleCloseModal}
                        bestScore={bestScore}
                        fetchOrUpdateScore={fetchOrUpdateScore}
                    />
                }
            </div>
        </>
    )
}