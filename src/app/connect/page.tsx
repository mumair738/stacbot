"use client";

import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function ConnectPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  
  useEffect(() => {
    
    if (isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
      <p className="text-lg mb-8">Please connect your wallet to continue to the game.</p>
      
     
      <ConnectWalletButton />
    </div>
  );
}