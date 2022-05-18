import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from "../types.js";

const initialState = {snackbar: false, message: ""};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {snackbar: true, message: action.payload};
    case SNACKBAR_CLOSE:
      return {snackbar: false};
    default:
      return state;
  }
}
