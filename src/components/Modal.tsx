import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
    isCorrect: boolean,
    secretWord: string,
    turn: number,
    restartGame: Function,
    resetModal: Function,
    bestScore: number,
    fetchOrUpdateScore: Function,
}

export default function ResultsModal({
    isCorrect, secretWord, turn, restartGame, resetModal, bestScore, fetchOrUpdateScore
}: ModalProps) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        resetModal();
        restartGame();
    }
    useEffect(() => {
        if (isCorrect && turn < bestScore) {
            fetchOrUpdateScore(turn);
        }
    }, [turn, bestScore, fetchOrUpdateScore]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
            className={isCorrect ? "word-game-win-modal" : "word-game-lose-modal"}
        >
            <Modal.Header closeButton className='btn-close-white'>
                <Modal.Title>{isCorrect ? "You Won!" : "You lost"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isCorrect ?
                    <>
                        <p className="text-center">Congratulations, you were able to guess the word in {turn} turn{turn > 1 ? "s" : ""}.</p>
                        <p className="text-center">The word was: {secretWord}</p>
                    </>
                    :
                    <>
                        <p className="text-center">Unfortunately you were not able to guess the word.</p>
                        <p className="text-center">The word was: {secretWord}</p>
                    </>
                }
            </Modal.Body>
        </Modal>
    );
}