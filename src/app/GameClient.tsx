"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeviceDetect } from "@/providers/DeviceDetectProvider";
import { getTitle } from "@/utils";
import { useKeyPressEvent } from "react-use";
import Board from "../components/Board";
import useGameModel from "../hooks/useGameModel";
import LevelSelector from "@/components/LevelSelector";
import MenuCard from "@/components/MenuCard";
import GameOverModal from "@/components/GameOverModal";
import { useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";
import { sdk } from "@farcaster/miniapp-sdk";



export default function Home() {
  const { isConnected, status } = useAccount();
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  const isMobile = useDeviceDetect();
  const { gameScore, state, action, gameLevel, setGameLevel, resetGame } = useGameModel({
    onGameOver: onOpen,
  });
  
  useKeyPressEvent(" ", action);

   useEffect(() => {
    sdk.actions.ready()
      .then(() => sdk.actions.addMiniApp())
      .catch((e) => console.warn("SDK ready error:", e));
  }, []);

  useEffect(() => {
    if (status === 'disconnected') {
      router.push('/connect');
    }
  }, [status, router]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  const handlePlayClick = () => {
    setIsMenuVisible(false);
  };

  const handlePlayAgain = () => {
    resetGame();
    setIsScoreSaved(false);

    onClose();
  };

  const handleSaveScore = () => {
    toast.success('Score saved successfully!');
    console.log("Score saved:", gameScore);
    setIsScoreSaved(true);
  };

  return (
    <>
      {isMenuVisible && <MenuCard onPlayClick={handlePlayClick} />}

      <GameOverModal
        isOpen={isOpen}
        gameStatus={state.gameStatus}
        score={gameScore}
        isSaved={isScoreSaved}
        onPlayAgain={handlePlayAgain}
        onSaveScore={handleSaveScore}
      />

      <div
        onClick={isMobile ? action : undefined}
        className="flex flex-col items-center h-full"
      >
        <h1 className="text-3xl md:text-5xl font-semibold mt-5 mb-8 md:mb-20 text-center">
          {getTitle(state.gameStatus)}
          <div className="opacity-90 text-base md:text-lg italic font-normal">
            {isMobile ? "(Touch to play)" : "(Press SPACEBAR to play)"}
          </div>
        </h1>
        <div className="flex items-center justify-between w-80 md:w-96 mb-6 md:mb-10">
          <div className="text-2xl font-medium">
            Score:
            <span className="font-semibold text-amber-400 [text-shadow:_0_4px_4px_var(--tw-shadow-color)] shadow-amber-500 ml-1">
              {gameScore}
            </span>
          </div>
          <LevelSelector
            level={gameLevel}
            setLevel={setGameLevel}
            gameState={state.gameStatus}
          />
        </div>
        <Board rows={state.rows} />
      </div>
    </>
  );
}