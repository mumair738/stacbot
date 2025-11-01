"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DeviceDetectProvider } from "./DeviceDetectProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi"; 
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DeviceDetectProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
              <Toaster position="top-center" />
            </NextThemesProvider>
          </NextUIProvider>
        </DeviceDetectProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}