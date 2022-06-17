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

import Loader from "../UI/Loader2";

import axios from "axios";

function User_birth_certificate({accesstoken}) {
  const [open, setOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState(null);
  const [tooltipText, setTooltipText] = useState("Copy Link");
  const [validity, setValidity] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkloader, setLinkloader] = useState(false);

  const generateUrl = (hours) => {
    let dt = new Date();
    dt.setHours(dt.getHours() + hours);
    setLinkloader(true);
    axios
      .post("/api/createTimeBasedCertificate", {
        userid: accesstoken._id,
        validTill: dt,
      })
      .then((res) => {
        console.log(res);
        setLinkUrl(`http://localhost:3000/thirdpartyview/${res.data}`);
        setLinkloader(false);
      })
      .catch((err) => {
        console.log("Error in creating link", err);
      });
  };

  useEffect(() => {
    const url = `/api/pdf_getter/${accesstoken?.birthIpfsHash}`;
    setPdfUrl(url);
  }, [accesstoken]);

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

        <Grid container spacing={2} style={{height: "80vh", padding: "2rem"}}>
          <Grid item xs={6}>
            {isLoading ? (
              <Loader />
            ) : (
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
            )}
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <div className={styles.rightsection}>
              <div className={styles.sharebtn} onClick={() => setOpen(true)}>
                <Image src={shareicon} width={30} height={30} />
                <p>Share Certificate</p>
              </div>
            </div>
          </Grid>
        </Grid>
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
          <Grid>
            {linkloader && <Loader height="3vh" />}
            <Button
              style={{marginTop: "30px"}}
              variant="contained"
              onClick={generateUrl.bind(null, validity)}
            >
              Generate Link
            </Button>
          </Grid>
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
