import Box from "@mui/material/Box";

import ViewMunicipalityCredentials from "./Forms/ViewMunicipalityCredentials";

import styles from "../../styles/Modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MunicipalityCredentials({municipality_name}) {
  return (
    <Box sx={style}>
      <h6 className={styles.modalHeading}>
        {municipality_name} Municipality Credentials
      </h6>
      <ViewMunicipalityCredentials />
    </Box>
  );
}

export default MunicipalityCredentials;
