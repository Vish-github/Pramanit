import {useEffect, useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import axios from "axios";
import {ethers} from "ethers";
import {Grid} from "@mui/material";

import Header from "../../layout/Header";

import styles from "../../styles/User_Birth_Certificate.module.css";
import verifyicon from "../../assets/svgs/verify.svg";

import Municipality from "../../Project_SmartContract/build/contracts/Muncipality.json";

function Thirdpartyview() {
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [data, setData] = useState(null);
  const [blockdetails, setBlockdetails] = useState(null);

  useEffect(() => {
    if (!router.isReady) {
      console.log("Not ready");
      return;
    }
    const {id} = router.query;
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
    const address = "0xfABbD44e3fc0b68D1F5a12664a5693672ecBed58";
    const contract = new ethers.Contract(address, Municipality.abi, signer);
    let id = JSON.stringify(data.userid);
    console.log(id);
    contract
      .getBirthCertificate(id)
      .then((res) => {
        console.log("res", res);
        console.log("ipfs", JSON.stringify(data.ipfshash));
        if (res == JSON.stringify(data.ipfshash)) {
          console.log("Verified");
          provider.getTransaction(data?.transactionid).then((res) => {
            console.log("response", res);
            setBlockdetails(res);
          });
        }
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
              {data?.username}
              {"'"}s birth certificate
            </h2>
          </div>
        </div>
      </Header>
      <div>
        <div className={styles.certificate_section}>
          <Grid container spacing={2} style={{height: "80vh", padding: "2rem"}}>
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
                {blockdetails && (
                  <div className={styles.blockdetails}>
                    <h2>Block details</h2>
                    <p>Transaction ID:{blockdetails.hash}</p>
                    <p>Block Hash:{blockdetails.blockHash}</p>
                    <p>Block No:{blockdetails.blockNumber}</p>
                    <p>Transaction Index:{blockdetails.transactionIndex}</p>
                  </div>
                )}
                <div
                  className={styles.verifybtn}
                  onClick={verifypdf}
                  style={{
                    backgroundColor: blockdetails ? "#38AF0E" : "#000080",
                  }}
                >
                  {blockdetails && (
                    <Image src={verifyicon} width={30} height={30} />
                  )}
                  <p style={{marginLeft: 10}}>
                    {blockdetails ? <>Verified</> : <>Verify Certificate</>}
                  </p>
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
