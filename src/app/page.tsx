import { Metadata } from "next";
import GameClient from "@/app/GameClient";

const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

const frame = {
  version: "next",
  imageUrl: `${appUrl}/icon.jpg`,
  button: {
    title: "Play Stacks Game!",
    action: {
      type: "launch_frame",
      name: "STACK GAME",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.jpg`,
      splashBackgroundColor: "#000000",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "STACK GAME",
    description: "A simple on-chain stacking game.",
    openGraph: {
      title: "STACK GAME",
      description: "A simple on-chain stacking game.",
      images: [`${appUrl}/icon.jpg`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <GameClient />;
}