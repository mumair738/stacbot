import AppNavBar from "@/components/AppNavBar";
import { RootProviders } from "@/providers/RootProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const font = DM_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Stacks Game",
  description: "Simple single player stacks game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(font.className, "overflow-hidden")}>
        <RootProviders>
          <main
            className={clsx(
              "flex flex-col h-svh text-foreground bg-background font-sans",
              font.variable
            )}
          >
            <AppNavBar />
            <div className="container mx-auto flex-1">{children}</div>
          </main>
        </RootProviders>
      </body>
    </html>
  );
}