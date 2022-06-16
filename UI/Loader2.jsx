import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ height = "70vh" }) => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
  };

  return (
    <Box style={styles}>
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loader;
