import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {connect} from "react-redux";
import {openSnackbar, closeSnackbar} from "../redux/actions/snackbar.action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars({
  snackbarmessage,
  closeSnackbarnow,
  openSnackbarmessage,
  snackbarstate,
}) {
  console.log("Snackbar", snackbarmessage);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbarnow();
  };

  return (
    <Stack spacing={2} sx={{width: "100%"}}>
      <Snackbar
        open={snackbarstate}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
          {snackbarmessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  snackbarmessage: state.snackbar?.message,
  snackbarstate: state.snackbar?.snackbar,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbarmessage: (param) => dispatch(openSnackbar(param)),
    closeSnackbarnow: () => dispatch(closeSnackbar()),
    reset: () => dispatch(reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
