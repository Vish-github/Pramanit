import "../styles/globals.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import ReduxLayout from "../layout/ReduxLayout";
import Snackbar from "../UI/Snackbar";
import ProtectedLayout from "../layout/ProctectedRoutes";

import Web3 from "web3";

import Municipality from "../Project_SmartContract/build/contracts/Muncipality.json";

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
  useEffect(async () => {
    await loadWeb3();
    await loadBlockchain();
  }, []);
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchain = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // setAccount({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    console.log("here", networkId);
    const networkData = Municipality.networks[networkId];
    console.log("h", networkData);
    if (networkData) {
      const contract = new web3.eth.Contract(
        Municipality.abi,
        networkData.address
      );
      // setContract(contract);
      // const memeHash = await contract.methods.getAData(0).call();
      // setNewfilehash(memeHash[0]);
      // console.log("memeHash", memeHash[0]);
      console.log("contact", contract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };
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
