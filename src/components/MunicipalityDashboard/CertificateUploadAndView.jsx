import {useState} from "react";

import {Grid, Typography, Modal} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {Box} from "@mui/system";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {ErrorMessage} from "formik";

import Button from "../../../UI/Button";
import ViewPdf from "../ViewPdf";

const CertificateUploadAndView = ({formProps, fileProps}) => {
  const viewPdf = (link) => {
    setCurrPdf(link);
    window.open(link, "PRINT", "height=600,width=1000");
  };
  const [open, setOpen] = useState(false);
  const [currPdf, setCurrPdf] = useState(null);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="space-around"
        spacing={2}
        padding={2}
      >
        {fileProps.map((x) => (
          <Box
            marginBottom={2}
            marginTop={2}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={x.name}
          >
            <label
              htmlFor={x.name}
              style={{
                border: "1px solid #000080",
                padding: "2rem",
                borderRadius: "5px",
                width: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {formProps.values[x.name] ? (
                <AttachFileIcon color="primary" />
              ) : (
                <>
                  <AddBoxIcon color="primary" />
                  <p>{formProps.values[x.name]}</p>
                </>
              )}
            </label>
            <>
              <input
                id={x.name}
                type="file"
                hidden
                name={x.name}
                onChange={(event) => {
                  formProps.setFieldValue(x.name, event.target.files[0]);
                  // uploadPhoto(event);
                }}
              />
              <Typography color="secondary" marginTop={2}>
                {formProps.values[x.name] && formProps.values[x.name].name}
              </Typography>
              <ErrorMessage
                name={x.name}
                render={(msg) => <Typography color="error">{msg}</Typography>}
              />
              <Typography color="primary" marginTop={2}>
                {x.title}
              </Typography>
            </>
            {formProps.values[x.name] && (
              <Button
                title={"View"}
                onClick={viewPdf.bind(null, formProps.values[x.name])}
              />
            )}
          </Box>
        ))}
      </Grid>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewPdf link={currPdf} />
      </Modal>
    </>
  );
};

export default CertificateUploadAndView;
