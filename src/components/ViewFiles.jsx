import {Button, Grid, Modal, Typography} from "@mui/material";
import React, {Fragment, useState} from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewPdf from "./ViewPdf";

import ButtonUi from "../../UI/Button";

const ViewFiles = ({files}) => {
  const [open, setOpen] = useState(false);
  const [currPdf, setCurrPdf] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewPdf = (link) => {
    // alert(link);
    setCurrPdf(link);
    // console.log(link);
    // handleOpen();
    window.open(link, "PRINT", "height=600,width=1000");
  };

  return (
    <Fragment>
      <Grid
        container
        item
        marginY={3}
        display="flex"
        justifyContent="space-around"
        spacing={2}
      >
        {files.map((file) => (
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            key={file.title}
          >
            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #000080",
                width: "150px",
                padding: "2rem",
                borderRadius: "10px",
              }}
              onClick={viewPdf.bind(null, file.link)}
            >
              <VisibilityIcon color="primary" />
              <Typography color="primary">View</Typography>
            </Button>
            <Typography color="primary" marginY={2}>
              {file.title}
            </Typography>
            {file.viewed ? (
              <Button
                variant="contained"
                color="success"
                style={{
                  color: "#f4f4f4",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  padding: "0.5rem 3rem",
                }}
              >
                Verified
              </Button>
            ) : (
              <ButtonUi title="Verify" onClick={file.onClick} />
            )}
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewPdf link={currPdf} />
      </Modal>
    </Fragment>
  );
};

export default ViewFiles;
