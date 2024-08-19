"use client";
import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext } from "react";
import { PaletteMode } from "@mui/material";
import { amber, common, deepOrange, grey } from "@mui/material/colors";
interface IProps {
  // Define the props for your component here
  children: React.ReactNode | React.ReactNode[];
}

interface GlobalContextProps {
  // Define the properties and methods for your global context here

  // Provide initial values for your global context here
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            ...deepOrange,
            main: deepOrange[300],
          },
          divider: deepOrange[200],
          text: {
            primary: common.black,
            secondary: common.black,
          },
        }
      : {
          // palette values for dark mode
          // palette values for light mode
          primary: {
            ...deepOrange,
            main: deepOrange[300],
          },
          divider: amber[200],
          text: {
            primary: common.white,
            secondary: common.white,
          },
        }),
  },
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light",
});

// export const GlobalContext = createContext<GlobalContextProps>({
//   // Provide initial values for your global context here
//   theme: Theme,
//   setTheme: () => {},
// });

// Rest of the code...

const Providers = ({ children }: IProps) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    console.log("theme", theme);
  }, [theme]);
  return (
    // <GlobalContext.Provider value={{ theme, setTheme }}>
    <ColorModeContext.Provider
      value={{ toggleColorMode: colorMode.toggleColorMode, mode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
    // </GlobalContext.Provider>
  );
};

export default Providers;
