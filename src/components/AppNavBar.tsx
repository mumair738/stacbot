"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button // Impor Button dari NextUI
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAccount, useDisconnect } from "wagmi"; // Impor hook baru

const AppNavBar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Stacks</p>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        {isConnected && (
          <NavbarItem className="hidden md:flex items-center gap-4">
            <p className="text-sm">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</p>
            <Button color="danger" variant="flat" size="sm" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </NavbarItem>
        )}
        
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavBar;