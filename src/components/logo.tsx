"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
const Logo = ({ size = 150 }: { size?: number }) => {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="w-full flex items-center justify-center">
      <Image
        src={currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="logo"
        width={size as number}
        height={size as number}
      />
    </div>
  );
};

export default Logo;
