import {useEffect, useState} from "react";

import {useRouter} from "next/router";

import axios from "axios";
import {ethers} from "ethers";

import Header from "../../layout/Header";

import styles from "../../styles/User_Birth_Certificate.module.css";

import Municipality from "../../Project_SmartContract/build/contracts/Muncipality.json";

function Thirdpartyview() {
  const router = useRouter();
  const [pageId, setPageId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!router.isReady) {
      console.log("Not ready");
      return;
    }
    const {id} = router.query;
    setPageId(id);
    axios
      .get(`/api/thirdpartyview/${id}`)
      .then((res) => {
        setData(res.data);
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

  const displayPdf = () => {
    console.log("ipfs", data.ipfshash);
    axios(`/api/pdf_getter/${data.ipfshash}`, {
      method: "GET",
      responseType: "blob",
      //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {/* <div className={styles.certificate_section}> */}
        {/* <Image
            src={dummycertificate}
            className={styles.dummycertificateImage}
          /> */}
        {/* {pdf && <IPFSPdf url={pdf} />} */}
        <div className={styles.rightsection}>
          {/* <div className={styles.blockdetails}>
              <h2>Block details</h2>
              <p>Transaction ID:sdjjsdhjdsgdf</p>
              <p>Assignee:</p>
              <p>Other:</p>
              <p>Other:</p>
            </div> */}
          <div
            className={styles.verifybtn}
            onClick={displayPdf}
            style={{backgroundColor: "#000"}}
          >
            <p>View Certificate</p>
          </div>
          <div className={styles.verifybtn} onClick={verifypdf}>
            <p>Verify Certificate</p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Thirdpartyview;
