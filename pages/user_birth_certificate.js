import {useEffect, useState} from "react";
import Image from "next/image";

import {connect} from "react-redux";

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";

import Header from "../layout/Header";
import Modal from "../layout/Modal";

import styles from "../styles/User_Birth_Certificate.module.css";
import shareicon from "../assets/svgs/share.svg";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import axios from "axios";

function User_birth_certificate({accesstoken}) {
  const [open, setOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState(null);
  const [tooltipText, setTooltipText] = useState("Copy Link");
  const [validity, setValidity] = useState(1);

  const generateUrl = (hours) => {
    const timestamp = hours * 60 * 60;
    if (linkUrl.includes("timestamp=")) {
      const reg = /\?timestamp=[0-9]+/gm;
      setLinkUrl(linkUrl.replace(reg, `?timestamp=${timestamp}`));
      let dt = new Date();
      dt.setHours(dt.getHours() + 2);
      axios
        .post("/api/createTimeBasedCertificate", {
          userid: accesstoken._id,
          validTill: dt,
        })
        .then((res) => {
          console.log(res);
          setLinkUrl(`http://localhost:3000/thirdpartyview/${res.data}`);
        })
        .catch((err) => {
          console.log("Error in creating link", err);
        });
    } else {
      setLinkUrl(`${linkUrl}?timestamp=${timestamp}`);
    }
  };

  const viewCertificate = () => {
    axios(`/api/pdf_getter/${accesstoken?.birthIpfsHash}`, {
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

  useEffect(() => {
    // fetch code
    setLinkUrl(
      "http://localhost:3000/viewapplication/627de1c493e342bcb2619bf3?timestamp=3600"
    );
  }, []);

  const displayLink = (
    <TextField
      label="Sharable Link"
      disabled={true}
      value={linkUrl}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <Tooltip title={tooltipText}>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(linkUrl);
                  setTooltipText("Link Copied!");
                  setTimeout(() => {
                    setTooltipText("Copy Link");
                  }, 2000);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <>
      <div>
        <Header>
          <div className={styles.header_container}>
            <div className={styles.user_name_container}>
              <h2 className={styles.user_name}>Your birth certificate</h2>
            </div>
          </div>
        </Header>
        <div
          className={styles.sharebtn}
          onClick={viewCertificate}
          style={{
            backgroundColor: "#000",
          }}
        >
          {/* <Image src={shareicon} width={30} height={30} /> */}
          <p>View Certificate</p>
        </div>
        <div className={styles.sharebtn} onClick={() => setOpen(true)}>
          <Image src={shareicon} width={30} height={30} />
          <p>Share Certificate</p>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <TextField
            label="Validity (Hours)"
            type="number"
            value={validity}
            onChange={(e) => {
              setValidity(e.target.value);
            }}
          />
          <Button
            style={{marginTop: "30px"}}
            variant="contained"
            onClick={generateUrl.bind(null, validity)}
          >
            Generate Link
          </Button>
        </Grid>

        {linkUrl && displayLink}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  accesstoken: state?.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User_birth_certificate);
