import "./config/ReactotronConfig";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';

import Themes from "./themes";
import AppComponents from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";

function App() {
  return (
    <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <AppComponents />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </LayoutProvider>
  );
}

export default App;
