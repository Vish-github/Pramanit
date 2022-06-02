import "../styles/globals.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import ReduxLayout from "../layout/ReduxLayout";
import Snackbar from "../UI/Snackbar";
import ProtectedLayout from "../layout/ProctectedRoutes";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
          <SessionProvider session={session}>
        <ProtectedLayout>
            <Component {...pageProps} />
        </ProtectedLayout>
          </SessionProvider>
      </ReduxLayout>
    </ThemeProvider>
  );
}

export default MyApp;
