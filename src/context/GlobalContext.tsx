import { createContext, ReactNode, useEffect, useState } from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

export interface GlobalContextType {
  setShowLoading: (showLoading: boolean) => void;
  showLoading: boolean;

  setIsOpenModal: (showLoading: boolean) => void;
  isOpenModal: boolean;

  setTheme: (theme: "light" | "dark") => void;
  theme: "light" | "dark";
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const getInitialTheme = (): "light" | "dark" => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) return storedTheme;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const removeOldTheme = theme === "dark" ? "light" : "dark";

    root.classList.remove(removeOldTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const values: GlobalContextType = {
    showLoading,
    setShowLoading,
    theme,
    setTheme,
    isOpenModal,
    setIsOpenModal,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
