import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";
import { ethers } from "ethers";
import { Grid } from "@mui/material";

import Header from "../../layout/Header";

import styles from "../../styles/User_Birth_Certificate.module.css";

import Municipality from "../../Project_SmartContract/build/contracts/Muncipality.json";

function Thirdpartyview() {
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!router.isReady) {
      console.log("Not ready");
      return;
    }
    const { id } = router.query;
    axios
      .get(`/api/thirdpartyview/${id}`)
      .then((res) => {
        setData(res.data);
        const url = `/api/pdf_getter/${res.data.ipfshash}`;
        setPdfUrl(url);
      })
      .catch((error) => {
        if (error.response.status) {
          alert("Link Timed out");
          router.push("/");
        } else {
          alert("Invalid Link");
          router.push("/");
        }
      });
  }, [router.isReady]);

  const verifypdf = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(0);
    const address = "0x043f15c48edfBE55c70d3e8A69621363cB77Dde0";
    const contract = new ethers.Contract(address, Municipality.abi, signer);
    contract
      .getBirthCertificate(data.userid)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <h2 className={styles.user_name}>
              {data?.username}'s birth certificate
            </h2>
          </div>
        </div>
      </Header>
      <div>
        <div className={styles.certificate_section}>
          <Grid
            container
            spacing={2}
            style={{ height: "80vh", padding: "2rem" }}
          >
            <Grid item xs={6}>
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href={pdfUrl}>to the PDF!</a>
                </p>
              </object>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center">
              <div className={styles.rightsection}>
                <div className={styles.blockdetails}>
                  <h2>Block details</h2>
                  <p>Transaction ID:sdjjsdhjdsgdf</p>
                  <p>Assignee:</p>
                  <p>Other:</p>
                  <p>Other:</p>
                </div>
                <div className={styles.verifybtn} onClick={verifypdf}>
                  <p>Verify Certificate</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Thirdpartyview;
