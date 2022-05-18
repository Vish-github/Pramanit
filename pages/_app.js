import "../styles/globals.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import ReduxLayout from "../layout/ReduxLayout";
import Snackbar from "../UI/Snackbar";
import ProtectedLayout from "../layout/ProctectedRoutes";

function MyApp({Component, pageProps}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000080",
      },
      success: {
        main: "#38AF0E",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ReduxLayout>
        <Snackbar />
        <ProtectedLayout>
          <Component {...pageProps} />
        </ProtectedLayout>
      </ReduxLayout>
    </ThemeProvider>
  );
}

export default MyApp;
