import useGameState from "@/hooks/useGameState";
import { computeGameScore } from "@/utils/score";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLatest } from "react-use";
import { CONFIG } from "../constants";
import GameState from "../enums/GameState";
import FrameRunner from "../helpers/FrameRunner";
import useLevel from "./useLevel";

const useGameModel = ({ onGameOver }: { onGameOver?: () => void }) => {
  const frameRunnerRef = useRef(new FrameRunner());
  const { gameLevel, setGameLevel, levelConfig } = useLevel();
  const { state, addRow, setRowPosition, restartGame } =
    useGameState(levelConfig);
  const stateRef = useLatest(state);
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    setGameScore(computeGameScore(stateRef.current));
  }, [state.activeRow, stateRef]);

  useEffect(() => {
    const handleFrame = (
      _frameCount: number,
      _frameLength: number,
      totalDuration: number
    ) => {
      const activeRow = state.rows[state.activeRow];
      const ms = totalDuration % levelConfig.msPerIteration;
      const uniquePosition = CONFIG.Columns - activeRow.length;
      const totalPositions = uniquePosition * 2;
      const msPerPosition = levelConfig.msPerIteration / totalPositions;
      const currentPosition = Math.floor(ms / msPerPosition);
      const newStart =
        currentPosition > uniquePosition
          ? totalPositions - currentPosition
          : currentPosition;
      setRowPosition(newStart);
    };

    frameRunnerRef.current.replaceOnFrame(handleFrame);
  }, [levelConfig.msPerIteration, setRowPosition, state.activeRow, state.rows]);

  useEffect(() => {
    const frameRunner = frameRunnerRef.current;
    frameRunner.start();
    return () => {
      frameRunner.reset();
    };
  }, []);

  useEffect(() => {
    if (
      state.gameStatus === GameState.Lost ||
      state.gameStatus === GameState.Won
    ) {
      frameRunnerRef.current.stop();
      onGameOver?.();
    }
  }, [state.gameStatus, onGameOver]);

  const action = useCallback(() => {
    if (state.gameStatus === GameState.Playing) {
      addRow();
    }
  }, [addRow, state.gameStatus]);

  const resetGame = () => {
    restartGame();
    frameRunnerRef.current.start();
  };

  return {
    gameScore,
    state,
    action,
    gameLevel,
    setGameLevel,
    resetGame,
  };
};

export default useGameModel;