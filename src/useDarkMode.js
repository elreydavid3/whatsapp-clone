import React, { useState } from "react";
const Context = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Context.Provider value={{ theme, handleClick }}>
      {children}
    </Context.Provider>
  );
}

export { ThemeProvider, Context };
