import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
    isCorrect: boolean,
    secretWord: string,
    turn: number,
    handleNewSecretWord: Function,
    restartGame: Function,
    resetModal: Function
}

export default function ResultsModal({
    isCorrect, secretWord, turn, restartGame, handleNewSecretWord, resetModal
}: ModalProps) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        resetModal();
        handleNewSecretWord();
        restartGame();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isCorrect ? "You Won!" : "You lost"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isCorrect ?
                    <>
                        <p>It took you {turn} turn{turn > 1 ? "s" : ""} to guess the word.</p>
                        <p>The word was: {secretWord}</p>
                    </>
                    :
                    <>
                        <p>Unfortunately you were not able to guess the word in the alotted turns.</p>
                        <p>The word was: {secretWord}</p>

                    </>
                }
            </Modal.Body>
        </Modal>
    );
}