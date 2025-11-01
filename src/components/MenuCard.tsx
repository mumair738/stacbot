"use client";

import { Button } from "@nextui-org/react";

interface MenuCardProps {
  onPlayClick: () => void;
}

export default function MenuCard({ onPlayClick }: MenuCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-800/80 p-8 shadow-lg border border-slate-700 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-400">How to Play</h1>
        
        <ul className="space-y-3 mb-8 list-disc list-inside text-slate-200">
          <li>Press SPACEBAR or Touch to drop the moving blocks.</li>
          <li>Stack the blocks perfectly on top of each other.</li>
          <li>Any overhanging blocks will be cut off for the next layer.</li>
          <li>The game ends if you miss the stack completely.</li>
        </ul>

        <div className="text-center mb-8 p-4 bg-slate-700/50 rounded-lg">
          <h2 className="font-semibold text-slate-300">Daily Chances</h2>
          <p className="text-2xl font-bold text-white">-- / --</p>
        </div>

        <Button 
          color="warning" 
          size="lg" 
          className="w-full font-bold text-lg"
          onClick={onPlayClick}
        >
          Play Game
        </Button>
      </div>
    </div>
  );
}