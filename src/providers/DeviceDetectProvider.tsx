"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DeviceDetectContext = createContext<boolean>(false);

export const DeviceDetectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <DeviceDetectContext.Provider value={isMobile}>
      {children}
    </DeviceDetectContext.Provider>
  );
};

export const useDeviceDetect = () => {
  return useContext(DeviceDetectContext);
};