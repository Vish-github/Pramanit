import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const Share_certificate = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Button variant="contained" onClick={handleOpen}>
        Share Certificate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3rem",
              maxWidth: "400px",
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
              style={{ marginLeft: "30px" }}
              variant="contained"
              onClick={generateUrl.bind(null, validity)}
              disabled={validity <= 0}
            >
              Generate Link
            </Button>
            {validity <= 0 && (
              <Typography color="error" mt={2}>
                * Invalid Validity Hours
              </Typography>
            )}
          </Grid>

          {linkUrl && displayLink}
        </Box>
      </Modal>
    </>
  );
};

export default Share_certificate;
