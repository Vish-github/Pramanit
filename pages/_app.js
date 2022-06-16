import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import ReduxLayout from "../layout/ReduxLayout";
import Snackbar from "../UI/Snackbar";
import ProtectedLayout from "../layout/ProctectedRoutes";
import { SessionProvider } from "next-auth/react";
import { Router } from "next/router";
import Loader from "../UI/Loader2";
import { useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(false);

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

  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });

  return (
    <ThemeProvider theme={theme}>
      <ReduxLayout>
        <Snackbar />
        <SessionProvider session={session}>
          <ProtectedLayout>
            {isLoading ? (
              <Loader height="100vh" />
            ) : (
              <Component {...pageProps} />
            )}
          </ProtectedLayout>
        </SessionProvider>
      </ReduxLayout>
    </ThemeProvider>
  );
}

export default MyApp;
