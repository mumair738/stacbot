"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import GameState from "../enums/GameState";

interface GameOverModalProps {
  isOpen: boolean;
  gameStatus: GameState;
  score: number;
  isSaved: boolean;
  onPlayAgain: () => void;
  onSaveScore: () => void;
}

export default function GameOverModal({ 
  isOpen, 
  gameStatus, 
  score, 
  isSaved,
  onPlayAgain, 
  onSaveScore 
}: GameOverModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      hideCloseButton
      isDismissable={false}
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="text-white bg-slate-800/80 border border-slate-700">
        <ModalHeader className="flex flex-col gap-1 text-center text-3xl font-bold">
          {gameStatus === GameState.Won ? 'You Won! 🎉' : 'Game Over'}
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-lg">Congratulations!</p>
          <p className="text-xl">
            You scored: <span className="font-bold text-2xl text-amber-400">{score}</span>
          </p>
        </ModalBody>
        <ModalFooter className="flex-col items-center">
          {!isSaved && (
            <Button 
              color="success" 
              variant="shadow" 
              className="w-full font-bold" 
              onPress={onSaveScore}
            >
              Save Score
            </Button>
          )}
          <Button 
            color="warning" 
            variant="light" 
            className="w-full" 
            onPress={onPlayAgain}
          >
            Play Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}