import React, { createContext, useEffect, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

interface AppContextProps {
  theme?: string;
  changeTheme?: () => void;
}

export const AppContext = createContext<AppContextProps>({});

export const AppContextProvider: React.FunctionComponent<
  AppContextProviderProps
> = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    const newTheme = theme === "" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    setTheme(themeSaved!);
  }, []);

  return (
    <AppContext.Provider value={{ theme, changeTheme }}>
      {children}
    </AppContext.Provider>
  );
};
