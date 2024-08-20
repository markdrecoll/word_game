import { useState, useEffect } from "react"
import useWordGame from "../hooks/useWordGame.tsx"
import Keypad from "./Keypad.tsx";
import Modal from "./Modal.tsx";
import Grid from "./Grid.tsx";
import Notification from "./Notification.tsx";
import keys from "../constants/keys.ts";

interface WordGameProps {
    secretWord: any,
    handleNewSecretWord: Function,
}

export default function WordGame({ secretWord, handleNewSecretWord }: WordGameProps) {
    const {
        currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup, handleNewGame, notificationText, showNotification
    } = useWordGame(secretWord);
    const [showModal, setShowModal] = useState(false);
    const [showMessageToUser, setShowMessageToUser] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowMessageToUser = () => setShowMessageToUser(true);
    const handleCloseToast = () => setShowMessageToUser(false);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 1000);
            window.removeEventListener('keyup', handleKeyup);
        }
        if (turn > 5) {
            setTimeout(() => setShowModal(true), 1000);
            window.removeEventListener('keyup', handleKeyup);
        }

        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup, isCorrect, turn])

    useEffect(() => {
        if (showNotification) {
            handleShowMessageToUser();
        }
    }, [showNotification])

    return (
        <>

            <Notification
                variant={"dark"}
                header={"Cannot make that move."}
                message={notificationText}
                position={"top-center"}
                show={showMessageToUser}
                setShow={handleCloseToast}
            />

            <div className="text-white">
                <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
                <Keypad keys={keys} usedKeys={usedKeys} />
                {showModal &&
                    <Modal
                        isCorrect={isCorrect}
                        turn={turn}
                        secretWord={secretWord}
                        handleNewSecretWord={handleNewSecretWord}
                        restartGame={handleNewGame}
                        resetModal={handleCloseModal}
                    />
                }
            </div>
        </>
    )
}