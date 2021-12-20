import React from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export default function App() {
  const theme = createTheme({}, ptBR);

  return(
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>
);

}