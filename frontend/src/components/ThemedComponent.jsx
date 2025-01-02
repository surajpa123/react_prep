import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};
