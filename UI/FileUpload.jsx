import { Button, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, display } from "@mui/system";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { ErrorMessage } from "formik";

const FileUpload = ({ formProps, fileProps }) => {
  return (
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
          <Box
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
            <label htmlFor={x.name}>
              {formProps.values[x.name] ? (
                <AttachFileIcon color="primary" />
              ) : (
                <AddBoxIcon color="primary" />
              )}
            </label>
            <input
              id={x.name}
              type="file"
              hidden
              name={x.name}
              onChange={(event) => {
                formProps.setFieldValue(x.name, event.target.files[0]);
                console.log(formProps);
              }}
              accept="application/pdf"
            />
          </Box>
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
        </Box>
      ))}
    </Grid>
  );
};

export default FileUpload;
