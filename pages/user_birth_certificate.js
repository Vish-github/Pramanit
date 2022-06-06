import {useEffect, useState} from "react";
import Image from "next/image";

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
import dummycertificate from "../assets/PRAMANIT/user_certificate_demo.png";
import shareicon from "../assets/svgs/share.svg";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function user_birth_certificate() {
  const [open, setOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState(null);
  const [tooltipText, setTooltipText] = useState("Copy Link");
  const [validity, setValidity] = useState(1);

  const generateUrl = (hours) => {
    const timestamp = hours * 60 * 60;
    if (linkUrl.includes("timestamp=")) {
      const reg = /\?timestamp=[0-9]+/gm;
      setLinkUrl(linkUrl.replace(reg, `?timestamp=${timestamp}`));
    } else {
      setLinkUrl(`${linkUrl}?timestamp=${timestamp}`);
    }
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
        <div className={styles.certificate_section}>
          <Image
            src={dummycertificate}
            className={styles.dummycertificateImage}
          />
          {/* <div className={styles.rightsection}> */}
          {/* <div className={styles.blockdetails}>
            <h2>Block details</h2>
            <p>Transaction ID:sdjjsdhjdsgdf</p>
            <p>Assignee:</p>
            <p>Other:</p>
            <p>Other:</p>
          </div> */}
          {/* </div> */}
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

export default user_birth_certificate;
