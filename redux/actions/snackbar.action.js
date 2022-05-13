import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from "../types";

export function openSnackbar(payload) {
  return function (dispatch) {
    console.log("in action");
    dispatch({type: SNACKBAR_OPEN, payload});
  };
}

export function closeSnackbar() {
  return function (dispatch) {
    dispatch({type: SNACKBAR_CLOSE});
  };
}
