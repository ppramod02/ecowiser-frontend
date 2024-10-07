
"use client";

import { useTheme } from "@/contexts/ThemeContext";

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`h-full w-full ${theme === 'dark' ? 'dark' : ''}`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
