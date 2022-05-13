import "../styles/globals.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React from "react";
import Layout from "../layout/ReduxLayout";
import Snackbar from "../layout/Snackbar";

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
      <Layout>
        <Snackbar />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
